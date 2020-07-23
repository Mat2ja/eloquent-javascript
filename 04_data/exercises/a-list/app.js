function arrayToList(arr) {
    let list = null;
    let arrClone = [...arr].reverse();

    for (let value of arrClone) {
        list = { value: value, rest: list }
    }

    return list;
}

// function arrayToList(array) {
//     let list = null;
//     for (let i = array.length - 1; i >= 0; i--) {
//         list = { value: array[i], rest: list };
//     }
//     return list;
// }

/* 
Every iteration of the loop, node points to the current sublist, and the body can read its value property to get the current element. At the end of an iteration, node moves to the next sublist. When that is null, we have reached the end of the list, and the loop is finished.
*/
function listToArray(list) {
    let arr = [];

    for (let node = list; node; node = node.rest) {
        arr.push(node.value);
    }

    return arr;
}

// takes an element and a list and creates a new list that adds the element to the front of the input list
function prepend(value, list) {
    return { value, rest: list };
}


function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
}



console.log(arrayToList([10, 20, 30]));
// { value: 10, rest: { value: 20, rest: { value: 30, rest: null } } }
arrayToList([2, 4]);


console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

console.log(nth(arrayToList([10, 20, 30, 40, 50, 60]), 4));
// → 50

