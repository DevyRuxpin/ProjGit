# Node Markov Text Generator

A Markov chain text generator that creates realistic machine-made text from an original source text.

## What is a Markov Chain?

A Markov Chain is a chain of possible outcomes, given a particular "state". For text generation, it builds a table of each word along with the words that can follow it. This allows the algorithm to generate text that sounds natural while being completely original.

## Features

- **MarkovMachine Class**: Core algorithm for building and traversing Markov chains
- **Command-line Interface**: Generate text from files or URLs
- **Error Handling**: Robust error handling for file and URL operations
- **Flexible Input**: Works with any text source (files, URLs, or direct text)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Using the MarkovMachine Class

```javascript
const { MarkovMachine } = require('./markov.js');

// Create a Markov machine from text
const mm = new MarkovMachine("the cat in the hat");

// Generate text (default 100 words)
console.log(mm.makeText());

// Generate specific number of words
console.log(mm.makeText(50));
```

### Command-line Interface

Generate text from a file:
```bash
node makeText.js file eggs.txt
```

Generate text from a URL:
```bash
node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
```

## Testing

Run the test suite:
```bash
node test.js
```

The tests cover:
- Basic Markov chain functionality
- Edge cases (empty text, single word)
- Consistency (same input produces same chains)
- Real-world text processing

## How It Works

1. **Text Processing**: The input text is split into words, filtering out empty strings
2. **Chain Building**: For each word, the algorithm records all possible next words
3. **Text Generation**: Starting with a random word, the algorithm follows the chain by randomly selecting from possible next words until reaching the desired length or a null (end of chain)

## Example Output

Given the text "the cat in the hat", the Markov chains would be:
```
{"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}
```

This could generate sequences like:
- "in the cat in the hat"
- "in the hat"
- "the cat in the cat in the hat"

## Error Handling

The application handles various error scenarios:
- File not found
- Invalid URLs
- Network errors
- Invalid command-line arguments

All errors are reported with clear, user-friendly messages. 