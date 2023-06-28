// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IHasAnswerVerifier.sol";

contract ProvenSolvers {
    address public hasAnswerVerifier;

    mapping(address => bool) public provenSolvers;

    error InvalidProof();

    event ProvenSolverAdded(address indexed solver);

    constructor(address _hasAnswerVerifier) {
        hasAnswerVerifier = _hasAnswerVerifier;
    }

    function prove(bytes memory proof, uint[] memory pubSignals) public {
        if(!IHasAnswerVerifier(hasAnswerVerifier).verifyProof(proof, pubSignals)) {
            revert InvalidProof();
        }

        emit ProvenSolverAdded(msg.sender);
        provenSolvers[msg.sender] = true;
    }
}