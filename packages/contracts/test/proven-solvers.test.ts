import 'hardhat';
import { ethers, snarkjs } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { PlonkVerifier, ProvenSolvers } from '../typechain-types';

describe('Problem solvers', function () {
    let verifier: PlonkVerifier;
        let provenSolvers: ProvenSolvers;

        const correctInput = {
            x: '1',
            y: '2'
        };
    
        const incorrectInput = {
            x: '4',
            y: '2'
        };

        let accounts: SignerWithAddress[];
        let solver: SignerWithAddress;
        let solver2: SignerWithAddress;

        before(async () => {
            const HasAnswerVerifier = await ethers.getContractFactory('PlonkVerifier');
            verifier = await HasAnswerVerifier.deploy();
            await verifier.deployed();
            const ProvenSolvers = await ethers.getContractFactory('ProvenSolvers');
            provenSolvers = await ProvenSolvers.deploy(verifier.address);
            await provenSolvers.deployed();
            accounts = await ethers.getSigners();
            solver = accounts[1];
            solver2 = accounts[2];
        });

    describe('Contract tests', async () => {
        it('Sets correct HasAnswerVerifier address', async () => {
            expect(await provenSolvers.hasAnswerVerifier()).to.equal(verifier.address);
        });

        it('Adds a new solver if correct proof passed', async () => {
            const { proof, publicSignals } = await snarkjs.plonk.fullProve(correctInput, './circuits/has-answer.wasm', './circuits/has-answer.zkey');
            const solidityCallData = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
            let [a, ...b] = solidityCallData.split(',');
            const calldata = [a, JSON.parse(b.join(','))];

            expect(await provenSolvers.connect(solver).prove(calldata[0], calldata[1])).to.emit(provenSolvers, 'ProvenSolver').withArgs(solver.address);
            expect(await provenSolvers.provenSolvers(solver.address)).to.be.true;
        });

        it('Does NOT add a new solver if incorrect proof passed', async () => {
            await expect(provenSolvers.connect(solver2).prove('0x0000000000000000000000000000000000000000000000000000000000000000', ['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000000'])).to.be.revertedWithCustomError(provenSolvers, 'InvalidProof');
            expect(await provenSolvers.provenSolvers(solver2.address)).to.be.false;
        });
    });
});