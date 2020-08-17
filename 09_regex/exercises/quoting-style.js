let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\W)'|'(\W|$)/gi, '$1"$2'));
// if it starts with nothing or non-word char and then '
// OR
// ' and then non-word char or ends with nothing

// → "I'm the cook," he said, "it's my job."