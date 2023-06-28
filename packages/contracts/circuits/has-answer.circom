pragma circom 2.0.0;

// Circuit for checking if a user has the answer to
// an equation. Equation for this example is x + y = 3(z).
template HasAnswer () {
    signal input x;
    signal input y;
    signal output z <== 3;

    z === x + y;
}

component main = HasAnswer();