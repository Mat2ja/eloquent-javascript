let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true


let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true

let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]


function getDate(string) {
  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

// The _(underscore) binding is ignored and used only to skip the full match element in the array returned by exec.

//* Word and string boundaries
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false

// Say we want to know whether a piece of text contains not only a number but a number followed by one of the words pig, cow, or chicken, or any of their plural forms.
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler


let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit, pos, str) {
  // args: match, match-group1, match-group2, index, original text

  console.log('match:', match); // match: 1 lemon
  console.log('amount:', amount); // amount: 1
  console.log('unit:', unit); // unit: lemon
  console.log('pos:', pos); // pos: 0
  console.log('str:', str); // str: 1 lemon, 2 cabbages, and 101 eggs

  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs

//* Greedy
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1

//* Non-greedy / Lazy
// Because of this behavior, we say the repetition operators(+, *, ?, and {}) are greedy, meaning they match as much as they can and backtrack from there.If you put a question mark after them(+?, *?, ??, {} ?), they become nongreedy and start by matching as little as possible, matching more only when the remaining pattern does not fit the smaller match.
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 + 1

let name = "harry";
let text = "Harry is a suspicious character.";
// let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
let regexp = new RegExp(`\\b(${name})\\b`, "gi");
console.log(regexp);
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.


let name = "dea+hl[]rd";
let text = "This dea+hl[]rd guy is super annoying.";
// add backslashes before any character that has a special meaning
let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&"); // dea\+hl\[]rd
console.log(escaped); 
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");
console.log(text.replace(regexp, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.

// Search method -> indexOf for regexes
console.log("  word".search(/\S/));
// → 2
console.log("    ".search(/\S/));
// → -1




function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

console.log(parseINI(`
searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn`));