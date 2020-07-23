// load dependencies
require("./code/load")("code/journal.js", "code/chapter/04_data.js");


//* iterate over individual events
//* create table for each event
//* calculate the corellation using the table
//* print if correlaction is significant
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}

// → weekend: 0.13719886811400708
// → brushed teeth: -0.3805211953235953
// → candy: 0.12964074471043288
// → work: -0.13719886811400708
// → spaghetti: 0.242535625036333
// → reading: 0.11068280537595927
// → peanuts: 0.59026798116852

// Eating peanuts has a strong positive effect on the chance of turning into a squirrel, whereas brushing his teeth has a significant negative effect.

// lets combine both and calculate the correlation
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1


// The phenomenon occurs precisely when Jacques eats peanuts and fails to brush his teeth.