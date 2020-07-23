var journal = [];

//* add entries to journal
function addEntry(events, squirrel) {
  journal.push({ events, squirrel });
}

//* calculate the correlation
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
      (table[0] + table[1]) *
      (table[1] + table[3]) *
      (table[0] + table[2]));
}

// same but with destructuring
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
      (n01 + n11) * (n00 + n10));
}

//* create table for calculating correlation

//* pass through all the entries and check if current event is in there
//* if event is preent, add 1, if squirell is true, add 2
//* create table from that index (binary)
//* it will pass through all the entries for each individual event
// function tableFor(event, journal) {
//   let table = [0, 0, 0, 0];
//   for (let i = 0; i < journal.length; i++) {
//     let entry = journal[i], index = 0;
//     if (entry.events.includes(event)) index += 1;
//     if (entry.squirrel) index += 2;
//     table[index] += 1;
//   }
//   return table;
// }

// malo sam moderniziro kod sa for of petljom
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let entry of journal) {
    let index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

//* iterate over events of each entry and return array of indiviudal events
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

//* SLICE
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}

console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]


//* REPEAT
function draw(string, length) {
  for (let i = 0; i < length; i++) {
    console.log(string.repeat(i + 1));
  }
}
draw('$', 5);

//* REST & SPREAD
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}

// better soulution
// ...rest turns all numbers into an array
function max(...numbers) {
  // spread array into numbers
  return Math.max(...numbers);
}

console.log(max(23, 5, 11));
// → 23

let nums = [5, 1, 7];
// spread array into values, rest in func argument will turn it into array, and spread inside func will turn it to numbers
console.log(max(...nums));
// → 7

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
