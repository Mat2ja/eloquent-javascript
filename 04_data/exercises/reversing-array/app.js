// function reverseArray(arr) {
//     return arr.reverse();
// }

// function reverseArrayInPlace(arr) {
//     arr = arr.reverse();
//     return arr;
// }


function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

// im modifying 2 arrays at once, probably not an optimal solution - book tells me its cheating smh
function reverseArrayInPlace(arr) {
    // let arrClone = arr.slice();
    let arrClone = [...arr]
    for (let i = arrClone.length - 1; i >= 0; i--) {
        arr.push(arrClone.pop());
        arr.shift();
    }
    return arr;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]



//solution
function reverseArray(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
        output.push(array[i]);
    }
    return output;
}

// swap first and last, 2nd and 2nd to last, etc
function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}
