# JavaScript Promises & Async/Await Exercises

This project demonstrates working with callbacks and promises through two main exercises, implemented using both **Promises** and **Async/Await** approaches.

## Project Structure

```
js-promises/
├── index.html              # Main HTML file (uses Promises)
├── index-async.html        # Alternative HTML file (uses Async/Await)
├── number-facts.js         # Part 1 implementation using Promises
├── number-facts-async.js   # Part 1 implementation using Async/Await
├── deck-of-cards.js        # Part 2 implementation using Promises
├── deck-of-cards-async.js  # Part 2 implementation using Async/Await
└── README.md              # This file
```

## How to Run

1. Open `index.html` in your web browser to see the **Promises** version
2. Open `index-async.html` in your web browser to see the **Async/Await** version

## Part 1: Number Facts

This section uses the [Numbers API](http://numbersapi.com/) to fetch interesting facts about numbers.

### Exercise 1: Single Number Fact
- Makes a request to get a fact about the number 42
- Displays the fact on the page

### Exercise 2: Multiple Number Facts
- Makes a single request to get facts about multiple numbers (1, 2, 3, 4, 5)
- Displays all facts on the page

### Exercise 3: Four Facts About Favorite Number
- Makes 4 separate requests for facts about the number 42
- Uses `Promise.all()` to wait for all requests to complete
- Displays all 4 facts (some may be repeats)

## Part 2: Deck of Cards

This section uses the [Deck of Cards API](http://deckofcardsapi.com/) to work with playing cards.

### Exercise 1: Single Card
- Creates a new shuffled deck and draws one card
- Console logs the card value and suit
- Displays the card on the page

### Exercise 2: Two Cards from Same Deck
- Creates a new deck and draws the first card
- Uses the same deck ID to draw a second card
- Console logs both cards
- Displays both cards on the page

### Exercise 3: Interactive Card Deck
- Creates a new shuffled deck when the page loads
- Shows a button to draw cards from the deck
- Displays drawn cards and tracks remaining cards
- Disables the draw button when no cards are left

## Promise vs Async/Await Comparison

### Promises Approach (`number-facts.js`, `deck-of-cards.js`)
```javascript
// Example from number-facts.js
function getSingleFact() {
    const container = document.getElementById('single-fact');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    const url = 'http://numbersapi.com/42?json';
    
    makeRequest(url)
        .then(data => {
            container.innerHTML = `
                <div class="fact">
                    <strong>${data.number}:</strong> ${data.text}
                </div>
            `;
        })
        .catch(error => {
            container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
}
```

### Async/Await Approach (`number-facts-async.js`, `deck-of-cards-async.js`)
```javascript
// Example from number-facts-async.js
async function getSingleFact() {
    const container = document.getElementById('single-fact');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const url = 'http://numbersapi.com/42?json';
        const data = await makeRequest(url);
        
        container.innerHTML = `
            <div class="fact">
                <strong>${data.number}:</strong> ${data.text}
            </div>
        `;
    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}
```

## Key Differences

1. **Syntax**: Async/await uses `async`/`await` keywords while promises use `.then()`/`.catch()`
2. **Error Handling**: Async/await uses `try/catch` blocks, promises use `.catch()`
3. **Readability**: Async/await often reads more like synchronous code
4. **Functionality**: Both approaches are functionally equivalent

## Features

- **Modern UI**: Clean, responsive design with Bootstrap-inspired styling
- **Error Handling**: Comprehensive error handling for API requests
- **Loading States**: Visual feedback during API calls
- **Console Logging**: Required console.log statements for card exercises
- **Interactive Elements**: Buttons and dynamic content updates
- **Color-coded Cards**: Hearts and diamonds are red, spades and clubs are black

## APIs Used

- **Numbers API**: `http://numbersapi.com/` - Provides interesting facts about numbers
- **Deck of Cards API**: `https://deckofcardsapi.com/` - Provides playing card functionality

## Browser Compatibility

This project uses modern JavaScript features:
- `fetch()` API for HTTP requests
- `async`/`await` syntax
- `Promise.all()` for concurrent requests

Works in all modern browsers (Chrome, Firefox, Safari, Edge). 