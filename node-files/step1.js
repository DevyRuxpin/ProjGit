const fs = require('fs');

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

// Get the file path from command line arguments
const path = process.argv[2];

if (!path) {
  console.error('Please provide a file path as an argument.');
  console.error('Usage: node step1.js <file-path>');
  process.exit(1);
}

cat(path);
