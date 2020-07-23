function loop(value, test, update, body) {
    if (!test(value)) return false;

    while (test(value)) {
        body(value);
        value = update(value);
    }
};

loop(3, n => n > 0, n => n - 1, console.log);


function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}