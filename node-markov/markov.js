/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;
      
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const result = [];
    const wordKeys = Object.keys(this.chains);
    
    if (wordKeys.length === 0) {
      return "";
    }
    
    // Start with a random word
    let currentWord = wordKeys[Math.floor(Math.random() * wordKeys.length)];
    
    while (result.length < numWords && currentWord !== null) {
      result.push(currentWord);
      
      const possibleNextWords = this.chains[currentWord];
      if (possibleNextWords.length === 0) {
        break;
      }
      
      // Pick a random next word from the possible choices
      currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
    }
    
    return result.join(" ");
  }
}

module.exports = { MarkovMachine };
