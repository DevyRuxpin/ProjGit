/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov.js');

async function generateText(source) {
  let text;
  
  // Check if source is a URL
  if (source.startsWith('http://') || source.startsWith('https://')) {
    try {
      const response = await axios.get(source);
      text = response.data;
    } catch (error) {
      console.error(`Error reading URL '${source}':`, error.message);
      process.exit(1);
    }
  } else {
    // Treat as a file path
    try {
      text = fs.readFileSync(source, 'utf8');
    } catch (error) {
      console.error(`Error reading file '${source}':`, error.message);
      process.exit(1);
    }
  }
  
  const mm = new MarkovMachine(text);
  return mm.makeText();
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2 || args[0] !== 'file' && args[0] !== 'url') {
    console.error('Usage: node makeText.js [file|url] [source]');
    console.error('Examples:');
    console.error('  node makeText.js file eggs.txt');
    console.error('  node makeText.js url http://www.gutenberg.org/files/11/11-0.txt');
    process.exit(1);
  }
  
  const [, source] = args;
  
  try {
    const generatedText = await generateText(source);
    console.log(`Generated text from ${args[0]} '${source}':`);
    console.log(generatedText);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

