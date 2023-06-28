import 'hardhat';
import { circuitTest, ethers, snarkjs } from 'hardhat';
import { assert, expect } from 'chai';

describe('Has answer', function () {
    let circuit: any;

    const correctInput = {
        x: '1',
        y: '2'
    };

    const incorrectInput = {
        x: '4',
        y: '2'
    };

    const correctOutput = {
        z: '3'
    };

    const sanityCheck = true; 

    before(async () => {
        circuit = await circuitTest.setup('has-answer');
    });

    describe('Circuit tests', () => {
        it('Produces a witness with valid constraints', async () => {
            const witness = await circuit.calculateWitness(correctInput, sanityCheck);
            await circuit.checkConstraints(witness);
        });

        it('Has expected witness values', async () => {
            const witness = await circuit.calculateLabeledWitness(correctInput, sanityCheck);
            assert.propertyVal(witness, 'main.z', correctOutput.z);
        });

        it('Gives the correct output', async () => {
            const witness = await circuit.calculateWitness(correctInput, sanityCheck);
            await circuit.assertOut(witness, correctOutput);
        });

        it('Rejects invalid inputs', async () => {
            await expect(circuit.calculateWitness(incorrectInput, sanityCheck)).to.be.rejectedWith(Error);
        });
    });

    describe('Verifier contract tests', () => {
        let verifier: any;
        let calldata: string[];

        beforeEach(async () => {
            const HasAnswerVerifier = await ethers.getContractFactory('contracts/HasAnswerVerifier.sol:PlonkVerifier');
            verifier = await HasAnswerVerifier.deploy();

            const { proof, publicSignals } = await snarkjs.plonk.fullProve(correctInput, './circuits/has-answer.wasm', './circuits/has-answer.zkey');
            const solidityCallData = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
            let [a, ...b] = solidityCallData.split(',');
            calldata = [a, JSON.parse(b.join(','))];
        });

        it('Accepts valid proofs', async () => {
            expect(await verifier.verifyProof(calldata[0], calldata[1])).to.be.true;
        });

        it('Rejects invalid proofs', async () => {
            expect(await verifier.verifyProof(calldata[0], ['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000000'])).to.be.false;
        });
    });
});