function every(array, test) {
    for (let elem of array) {
        if (!test(elem)) return false;
    }
    return true;
}

function every2(array, test) {
    return !array.some(e => !test(e))
}
// 👆 check if there is any that doesnt pass the test
// if there is, return reverse of that, meaning false, cos not all pass the test

function every3(array, test) {
    return array.every(e => test(e))
}



console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true