// Global variables
let currentDeckId = null;
let cardsRemaining = 0;

// DOM elements
const numberFactsDiv = document.getElementById('numberFacts');
const cardInfoDiv = document.getElementById('cardInfo');
const cardContainerDiv = document.getElementById('cardContainer');

// Part 1: Number Facts Functions

// 1. Get a single fact about a favorite number
async function getSingleFact() {
    const favoriteNumber = 42; // You can change this to your favorite number
    try {
        const response = await fetch(`http://numbersapi.com/${favoriteNumber}?json`);
        const data = await response.json();
        
        console.log(`Single fact about ${favoriteNumber}:`, data.text);
        
        displayFact(`${favoriteNumber}: ${data.text}`);
    } catch (error) {
        console.error('Error fetching single fact:', error);
        displayError('Failed to fetch single fact');
    }
}

// 2. Get facts about multiple numbers in a single request
async function getMultipleFacts() {
    const numbers = [1, 2, 3, 4, 5]; // You can change these numbers
    try {
        const response = await fetch(`http://numbersapi.com/${numbers.join(',')}?json`);
        const data = await response.json();
        
        console.log('Multiple facts:', data);
        
        // Clear previous facts
        numberFactsDiv.innerHTML = '<h3>Multiple Number Facts:</h3>';
        
        // Display each fact
        Object.keys(data).forEach(number => {
            displayFact(`${number}: ${data[number]}`);
        });
    } catch (error) {
        console.error('Error fetching multiple facts:', error);
        displayError('Failed to fetch multiple facts');
    }
}

// 3. Get 4 facts about a favorite number (multiple requests)
async function getFourFacts() {
    const favoriteNumber = 42; // You can change this to your favorite number
    const promises = [];
    
    // Create 4 separate requests
    for (let i = 0; i < 4; i++) {
        promises.push(fetch(`http://numbersapi.com/${favoriteNumber}?json`));
    }
    
    try {
        const responses = await Promise.all(promises);
        const facts = await Promise.all(responses.map(response => response.json()));
        
        console.log('Four facts about', favoriteNumber, ':', facts.map(f => f.text));
        
        // Clear previous facts
        numberFactsDiv.innerHTML = '<h3>Four Facts About Your Favorite Number:</h3>';
        
        // Display each fact
        facts.forEach((fact, index) => {
            displayFact(`Fact ${index + 1}: ${fact.text}`);
        });
    } catch (error) {
        console.error('Error fetching four facts:', error);
        displayError('Failed to fetch four facts');
    }
}

// Helper function to display facts
function displayFact(fact) {
    const factDiv = document.createElement('div');
    factDiv.className = 'fact-container';
    factDiv.textContent = fact;
    numberFactsDiv.appendChild(factDiv);
}

// Helper function to display errors
function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    numberFactsDiv.appendChild(errorDiv);
}

// Part 2: Deck of Cards Functions

// 1. Get a single card from a newly shuffled deck
async function getSingleCard() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();
        
        const card = data.cards[0];
        const cardDescription = `${card.value} of ${card.suit}`;
        
        console.log('Single card:', cardDescription);
        
        cardInfoDiv.innerHTML = `<h3>Single Card:</h3><p>${cardDescription}</p>`;
        displayCard(card);
    } catch (error) {
        console.error('Error fetching single card:', error);
        cardInfoDiv.innerHTML = '<div class="error">Failed to fetch single card</div>';
    }
}

// 2. Get two cards from the same deck
async function getTwoCards() {
    try {
        // First, create a new deck and draw one card
        const response1 = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data1 = await response1.json();
        
        const deckId = data1.deck_id;
        const card1 = data1.cards[0];
        
        // Then draw another card from the same deck
        const response2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data2 = await response2.json();
        
        const card2 = data2.cards[0];
        
        const card1Description = `${card1.value} of ${card1.suit}`;
        const card2Description = `${card2.value} of ${card2.suit}`;
        
        console.log('Two cards from same deck:', card1Description, 'and', card2Description);
        
        cardInfoDiv.innerHTML = `
            <h3>Two Cards from Same Deck:</h3>
            <p>Card 1: ${card1Description}</p>
            <p>Card 2: ${card2Description}</p>
        `;
        
        // Clear previous cards and display new ones
        cardContainerDiv.innerHTML = '';
        displayCard(card1);
        displayCard(card2);
    } catch (error) {
        console.error('Error fetching two cards:', error);
        cardInfoDiv.innerHTML = '<div class="error">Failed to fetch two cards</div>';
    }
}

// 3. Create a new deck and enable drawing cards
async function createNewDeck() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        const data = await response.json();
        
        currentDeckId = data.deck_id;
        cardsRemaining = data.remaining;
        
        console.log('New deck created:', currentDeckId, 'with', cardsRemaining, 'cards');
        
        cardInfoDiv.innerHTML = `
            <h3>New Deck Created!</h3>
            <p>Deck ID: ${currentDeckId}</p>
            <p>Cards remaining: ${cardsRemaining}</p>
        `;
        
        // Enable the draw card button
        document.getElementById('drawCardBtn').disabled = false;
        
        // Clear previous cards
        cardContainerDiv.innerHTML = '';
    } catch (error) {
        console.error('Error creating new deck:', error);
        cardInfoDiv.innerHTML = '<div class="error">Failed to create new deck</div>';
    }
}

// Draw a card from the current deck
async function drawCard() {
    if (!currentDeckId) {
        cardInfoDiv.innerHTML = '<div class="error">Please create a new deck first</div>';
        return;
    }
    
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=1`);
        const data = await response.json();
        
        if (data.success) {
            const card = data.cards[0];
            const cardDescription = `${card.value} of ${card.suit}`;
            
            console.log('Drew card:', cardDescription);
            
            cardsRemaining = data.remaining;
            
            cardInfoDiv.innerHTML = `
                <h3>Card Drawn:</h3>
                <p>${cardDescription}</p>
                <p>Cards remaining: ${cardsRemaining}</p>
            `;
            
            displayCard(card);
            
            // Disable draw button if no cards left
            if (cardsRemaining === 0) {
                document.getElementById('drawCardBtn').disabled = true;
                cardInfoDiv.innerHTML += '<p><strong>No more cards in deck!</strong></p>';
            }
        } else {
            cardInfoDiv.innerHTML = '<div class="error">Failed to draw card</div>';
        }
    } catch (error) {
        console.error('Error drawing card:', error);
        cardInfoDiv.innerHTML = '<div class="error">Failed to draw card</div>';
    }
}

// Helper function to display a card visually
function displayCard(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    const valueDiv = document.createElement('div');
    valueDiv.className = 'card-value';
    valueDiv.textContent = card.value;
    
    const suitDiv = document.createElement('div');
    suitDiv.className = `card-suit ${card.suit.toLowerCase()}`;
    
    // Convert suit names to symbols
    const suitSymbols = {
        'HEARTS': '♥',
        'DIAMONDS': '♦',
        'CLUBS': '♣',
        'SPADES': '♠'
    };
    
    suitDiv.textContent = suitSymbols[card.suit] || card.suit;
    
    cardDiv.appendChild(valueDiv);
    cardDiv.appendChild(suitDiv);
    cardContainerDiv.appendChild(cardDiv);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Number Facts buttons
    document.getElementById('singleFactBtn').addEventListener('click', getSingleFact);
    document.getElementById('multipleFactsBtn').addEventListener('click', getMultipleFacts);
    document.getElementById('fourFactsBtn').addEventListener('click', getFourFacts);
    
    // Deck of Cards buttons
    document.getElementById('singleCardBtn').addEventListener('click', getSingleCard);
    document.getElementById('twoCardsBtn').addEventListener('click', getTwoCards);
    document.getElementById('newDeckBtn').addEventListener('click', createNewDeck);
    document.getElementById('drawCardBtn').addEventListener('click', drawCard);
    
    // Initialize by creating a new deck
    createNewDeck();
}); 