// Sort the letters in str1 by the order they occur in str2.  You can assume str2 will not have repetitive characters.

function sortByStrings (str1, str2) {
  const sortByIdx = (a, b) => str2.indexOf(a) - str2.indexOf(b)
  //compare fnc that sorts in ascending str2.indexOf value
  return str1.split('').sort(sortByIdx).join('');
  //split str1 into an array of letters, run the sort, and re-join
}

sortByStrings('weather', 'therapyw') // 'theeraw'
// sortByStrings('good', 'odg') // 'oodg'

