const fs = require('fs');
const axios = require('axios');

function cat(path) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading ${path}:`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

function writeToFile(content, filename) {
  try {
    // Ensure content is a string
    if (typeof content !== 'string') {
      content = JSON.stringify(content, null, 2);
    }
    fs.writeFileSync(filename, content, 'utf8');
  } catch (error) {
    console.error(`Couldn't write ${filename}:`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Please provide a file path or URL as an argument.');
    console.error('Usage: node step3.js [--out filename] <file-path-or-url>');
    process.exit(1);
  }

  let outputFile = null;
  let inputPath = null;

  // Parse arguments
  if (args[0] === '--out') {
    if (args.length < 3) {
      console.error('Please provide both output filename and input path/URL.');
      console.error('Usage: node step3.js --out filename <file-path-or-url>');
      process.exit(1);
    }
    outputFile = args[1];
    inputPath = args[2];
  } else {
    inputPath = args[0];
  }

  // Get content based on whether it's a URL or file path
  let content;
  if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    content = await webCat(inputPath);
  } else {
    content = cat(inputPath);
  }

  // Output content
  if (outputFile) {
    writeToFile(content, outputFile);
  } else {
    console.log(content);
  }
}

main();
