pragma circom 2.0.0;

// Circuit for checking if a user has the answer to
// an equation. Equation for this example is 1 + 2 = 3(x).
// If the user submits 3, the circuit will pass.
template HasAnswer () {
    signal input x;
    signal output y <== 1 + 2;

    x === y;
}

component main {public [x]} = HasAnswer();