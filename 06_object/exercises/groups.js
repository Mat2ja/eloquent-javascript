class Group {
    constructor(group = []) {
        this.group = group;
    }

    add(val) {
        if (!this.group.includes(val)) this.group.push(val);
    }

    delete(val) {
        if (this.group.includes(val)) {
            let i = this.group.indexOf(val);
            this.group.splice(i, 1);
        };
    }

    has(val) {
        return this.group.includes(val);
    }

    static from(group) {
        return new Group(group);
    }
}

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

class GroupIterator() {
    constructor(group) {
        this.group = group;
    }

    next() {
    }
}


for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c