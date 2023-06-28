// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IHasAnswerVerifier {
    function verifyProof(bytes memory proof, uint[] memory pubSignals) external returns (bool);
}