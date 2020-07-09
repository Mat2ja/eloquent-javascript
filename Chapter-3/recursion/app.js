function isEven(num) {
    // turn negative nums into positive
    if (num < 0) {
        num = -num;
    }

    if (num === 0) {
        return true;
    } else if (num === 1) {
        return false;
    } else {
        num -= 2;
        return isEven(num);
    }

}


// solution
function isEven(n) {
    if (n == 0) return true;
    else if (n == 1) return false;
    else if (n < 0) return isEven(-n);
    else return isEven(n - 2);
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-30));
console.log(isEven(-51));