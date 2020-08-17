const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("sLocked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    let locked = box.locked;
    if (!locked) {
        return body();
    }

    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

// if we didnt unlcock the box, we would catch the error here
// try {
//     withBoxUnlocked(function () {
//         box.content.push("gold piece");
//     });
// } catch (e) {
//     console.error(e)
// }

try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.error("Error raised:", e);
}

console.log(box.locked);
console.log(box['_content']);
// → true