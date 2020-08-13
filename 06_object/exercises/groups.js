class Group {
    constructor(group = []) {
        this.members = group;
    }

    add(val) {
        if (!this.has(val)) this.members.push(val);
    }

    delete(val) {
        if (this.has(val)) {
            let i = this.members.indexOf(val);
            this.members.splice(i, 1);
        };
    }

    has(val) {
        return this.members.includes(val);
    }

    static from(collection) {
        return new Group(collection);
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.position = 0;
    }

    next() {
        if (this.position >= this.group.members.length) {
            return { done: true };
        }
        let result = { value: this.group.members[this.position], done: false };
        this.position++;

        return result;
    }
}



let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
console.log(group);
group.delete(10);
console.log(group.has(10));
console.log(group);



for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c









// class Group {
//     constructor() {
//         this.members = [];
//     }

//     add(value) {
//         if (!this.has(value)) {
//             this.members.push(value);
//         }
//     }

//     delete(value) {
//         this.members = this.members.filter(v => v !== value);
//     }
//     has(value) {
//         return this.members.includes(value);
//     }

//     static from(collection) {
//         let group = new Group;
//         for (let value of collection) {
//             group.add(value);
//         }
//         return group;
//     }
// }