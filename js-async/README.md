# JavaScript Async APIs

This project demonstrates asynchronous JavaScript operations using two popular APIs: the Numbers API and the Deck of Cards API.

## Features

### Part 1: Number Facts
- **Single Fact**: Get a fact about your favorite number (currently set to 42)
- **Multiple Facts**: Get facts about multiple numbers in a single request
- **Four Facts**: Get 4 different facts about your favorite number using multiple requests

### Part 2: Deck of Cards
- **Single Card**: Draw a single card from a newly shuffled deck
- **Two Cards**: Draw two cards from the same deck
- **Interactive Deck**: Create a new deck and draw cards one by one until the deck is empty

## How to Run

1. Open `index.html` in your web browser
2. The page will automatically create a new deck when it loads
3. Use the buttons to interact with both APIs

## API Endpoints Used

### Numbers API (http://numbersapi.com/)
- `GET /{number}?json` - Get a fact about a specific number
- `GET /{number1},{number2},...?json` - Get facts about multiple numbers

### Deck of Cards API (https://deckofcardsapi.com/)
- `GET /api/deck/new/shuffle/` - Create a new shuffled deck
- `GET /api/deck/new/draw/?count=1` - Create a new deck and draw a card
- `GET /api/deck/{deck_id}/draw/?count=1` - Draw a card from an existing deck

## Code Structure

- `index.html` - Main HTML file with styling and structure
- `script.js` - JavaScript file containing all the async functionality
- `README.md` - This documentation file

## Key JavaScript Concepts Demonstrated

- **async/await** for handling asynchronous operations
- **fetch()** API for making HTTP requests
- **Promise.all()** for handling multiple concurrent requests
- **Error handling** with try/catch blocks
- **DOM manipulation** for updating the UI
- **Event listeners** for user interactions

## Customization

You can easily customize the application by:
- Changing the favorite number in the `getSingleFact()` and `getFourFacts()` functions
- Modifying the numbers array in `getMultipleFacts()` function
- Adjusting the styling in the CSS section of `index.html`

## Browser Compatibility

This application uses modern JavaScript features and should work in all modern browsers that support:
- ES6+ features (async/await, arrow functions, etc.)
- Fetch API
- CSS Grid and Flexbox

## Notes

- The Numbers API may return repeated facts when making multiple requests for the same number
- The Deck of Cards API creates a new deck for each session
- All API responses are logged to the browser console for debugging purposes 