const fs = require('fs');
const axios = require('axios');

function cat(path) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    console.log(content);
  } catch (error) {
    console.error(`Error reading ${path}:`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

// Get the path/URL from command line arguments
const path = process.argv[2];

if (!path) {
  console.error('Please provide a file path or URL as an argument.');
  console.error('Usage: node step2.js <file-path-or-url>');
  process.exit(1);
}

// Check if the argument is a URL (starts with http:// or https://)
if (path.startsWith('http://') || path.startsWith('https://')) {
  webCat(path);
} else {
  cat(path);
}
