let map = { one: true, two: true, hasOwnProperty: true };



// Doesn't work bcs object had property with the same name
//console.log(map.hasOwnProperty("one"));


console.log(hasOwnProperty.call(map, "one"));
// → true