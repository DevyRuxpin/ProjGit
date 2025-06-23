/** Test file for Markov Machine */

const { MarkovMachine } = require('./markov.js');

// Test 1: Basic functionality
console.log('=== Test 1: Basic Markov Machine ===');
const mm1 = new MarkovMachine('the cat in the hat');
console.log('Chains:', mm1.chains);
console.log('Generated text (10 words):', mm1.makeText(10));
console.log();

// Test 2: Empty text
console.log('=== Test 2: Empty text ===');
const mm2 = new MarkovMachine('');
console.log('Chains:', mm2.chains);
console.log('Generated text:', mm2.makeText());
console.log();

// Test 3: Single word
console.log('=== Test 3: Single word ===');
const mm3 = new MarkovMachine('hello');
console.log('Chains:', mm3.chains);
console.log('Generated text:', mm3.makeText());
console.log();

// Test 4: Test with eggs.txt content
console.log('=== Test 4: Eggs.txt content ===');
const fs = require('fs');
const text = fs.readFileSync('eggs.txt', 'utf8');
const mm4 = new MarkovMachine(text);
console.log('Number of unique words:', Object.keys(mm4.chains).length);
console.log('Sample chains:');
const sampleWords = Object.keys(mm4.chains).slice(0, 5);
sampleWords.forEach(word => {
  console.log(`  "${word}": [${mm4.chains[word].map(w => w === null ? 'null' : `"${w}"`).join(', ')}]`);
});
console.log('Generated text (20 words):', mm4.makeText(20));
console.log();

// Test 5: Consistency test (same input should produce same chains)
console.log('=== Test 5: Consistency test ===');
const mm5a = new MarkovMachine('the cat in the hat');
const mm5b = new MarkovMachine('the cat in the hat');
console.log('Chains are identical:', JSON.stringify(mm5a.chains) === JSON.stringify(mm5b.chains));
console.log(); 