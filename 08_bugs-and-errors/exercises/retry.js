class MultiplicatorUnitFailure extends Error { }

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure('Klunk');
    }
};

// Correct solution
// Doesnt show our custom erorr, it just keeps trying again
// if it gets different error it throws it and finishes everything
function reliableMultiply(a, b) {
    for (; ;) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure))
                throw e;
        }
    }
}
console.log(reliableMultiply(8, 8));
// → 64

// My take on the correct one
// Logs our error and shows the correct result when it gets it, or throws the error and finishes alltogether
function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.error(e);
            } else {
                throw (e);
            }
        }
    }
}