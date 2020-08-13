class PGroup {
    constructor(members) {
        this.members = members;
    }

    // directly on the constructor, can't be called by an instance
    static empty = new PGroup([]);

    add(val) {
        if (this.has(val)) return this;

        return new PGroup(this.members.concat([val]));
    }

    delete(val) {
        if (!this.has(val)) return this;

        return new PGroup(this.members.filter(m => m !== val));
    }

    has(val) {
        return this.members.includes(val);
    }

};

console.dir(PGroup);

// PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
// adding returns new PGroup, so it cant be modified, only can store in a new variable

console.log(a);
console.log(ab);
console.log(b);

// console.log(b.has("b"));
// → true
// console.log(a.has("b"));
// → false
// console.log(b.has("a"));
// → false