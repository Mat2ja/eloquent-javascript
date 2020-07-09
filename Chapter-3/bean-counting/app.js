// function countBs(str) {
//     let count = 0;
//     for (let c of str) {
//         if (c === 'B') {
//             count++;
//         }
//     }
//     return count;
// }


function countChar(str, char) {
	let count = 0;
	for (let c of str) {
		if (c === char) count++;
	}
	return count;
}

let countBs = (str) => countChar(str, 'B');


console.log(countBs('Baka Barica Boli Breksve')); //4
console.log(countBs('ide gas')); //0
console.log(countChar('palim i žarim', 'm')); //s


// solution 
// function countChar(string, ch) {
//     let counted = 0;
//     for (let i = 0; i < string.length; i++) {
//         if (string[i] == ch) {
//             counted += 1;
//         }
//     }
//     return counted;
// }

// function countBs(string) {
//     return countChar(string, "B");
// }