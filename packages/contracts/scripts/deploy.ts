import 'hardhat';
import { ethers } from 'hardhat';

async function main() {
    const HasAnswerVerifier = await ethers.getContractFactory('PlonkVerifier');
    const verifier = await HasAnswerVerifier.deploy();
    await verifier.deployed();
    console.log('HasAnswerVerifier deployed to:', verifier.address);
    const ProvenSolvers = await ethers.getContractFactory('ProvenSolvers');
    const provenSolvers = await ProvenSolvers.deploy(verifier.address);
    await provenSolvers.deployed();
    console.log('ProvenSolvers deployed to:', provenSolvers.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});