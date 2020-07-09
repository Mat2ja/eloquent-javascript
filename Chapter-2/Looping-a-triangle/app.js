/*
Write a loop that makes seven calls to console.log to output the following triangle:
#
##
###
####
#####
######
#######
It may be useful to know that you can find the length of a string by writing.length after it.
*/

// My solution
let output = '';

for (let i = 0; i < 7; i++) {
    for (let j = 0; j <= i; j++) {
        output += '#';
    }
    output += '\n';
}
console.log(output);


// OFFICIAL SOLUTION
for (let line = "#"; line.length < 8; line += "#") {
    console.log(line);
}

// for (let line = '#'; line.length <= 7; line += '#') {
//     console.log(line)
// }
