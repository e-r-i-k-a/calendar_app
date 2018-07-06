// webCrawler
// I wrote a crawler that visits web pages, stores a few keywords in a database, and follows links to other web pages.  I noticed that my crawler was wasting a lot of time visitng the same pages over and over, so I made a set, 'visited,' where I'm storing URLs that I've already visited.  Now the crawler only visits a URL if it hasn't already been visited.  Let's see if we can make this crawler use less memory.  See if you can come up with a data structure better than a hash that just stores the entire URL.  How can we trim down the amount of space taken up by 'visited'?  Explain in words and implement your solution.

class Trie {
  constructor() {}
  add(word) {
    let current = this;
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (!current[letter]) {
        current[letter] = new Trie;
        //if the letter isn't there, make a new letter[obj] key/pair
      }
      current = current[letter] //onto the next letter
    }
    current.end = true;  //mark the end of a word
  }
}

let visited = new Trie;
visited.add('https://github.com')
visited.add('https://github.com/erika')
visited.add('https://stackoverflow.com')
visited.add('https://www.google.com')
console.log(visited)

//A trie data structure is a good option for saving URL data.  We want each string entry to be unique (no duplicates), and a lot of our URL data will have the same prefix characters (protocol, domain name, and following RESTful text).  In this case, we only need to store the prefix text once, and any unique extensions to that domain can be linked to the original prefix.  For example, to store: 'https://github.com' and 'https://github.com/e-r-i-k-a', we'd first store 'https://github.com' (split by character) and assign the last letter ('m') two properties: one is 'end' to signify that 'https://github.com' is a complete entry, and one is '/e-r-i-k-a' (split by character) to signify that another entry is the former + '/e-r-i-k-a'.
