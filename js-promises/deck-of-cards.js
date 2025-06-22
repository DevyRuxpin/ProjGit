// Part 2: Deck of Cards using Promises

// Helper function to make API requests
function makeCardRequest(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

// 1. Get a single card from a newly shuffled deck
function getSingleCard() {
    const container = document.getElementById('single-card');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    const url = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
    
    makeCardRequest(url)
        .then(data => {
            const card = data.cards[0];
            console.log(`${card.value} of ${card.suit}`); // Console log as requested
            container.innerHTML = `
                <div class="card ${card.suit.toLowerCase()}">
                    <strong>${card.value} of ${card.suit}</strong>
                </div>
            `;
        })
        .catch(error => {
            container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
}

// 2. Get two cards from the same deck
function getTwoCards() {
    const container = document.getElementById('two-cards');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    // First, create a new deck and draw one card
    const firstCardUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
    
    makeCardRequest(firstCardUrl)
        .then(data => {
            const deckId = data.deck_id;
            const firstCard = data.cards[0];
            
            console.log(`${firstCard.value} of ${firstCard.suit}`); // Console log first card
            
            // Then draw a second card from the same deck
            const secondCardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
            return makeCardRequest(secondCardUrl)
                .then(secondData => {
                    const secondCard = secondData.cards[0];
                    console.log(`${secondCard.value} of ${secondCard.suit}`); // Console log second card
                    
                    container.innerHTML = `
                        <div class="card ${firstCard.suit.toLowerCase()}">
                            <strong>${firstCard.value} of ${firstCard.suit}</strong>
                        </div>
                        <div class="card ${secondCard.suit.toLowerCase()}">
                            <strong>${secondCard.value} of ${secondCard.suit}</strong>
                        </div>
                    `;
                });
        })
        .catch(error => {
            container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
}

// 3. Interactive card deck
let currentDeckId = null;
let remainingCards = 0;

function createNewDeck() {
    const deckInfo = document.getElementById('deck-info');
    const drawnCards = document.getElementById('drawn-cards');
    const drawCardBtn = document.getElementById('draw-card-btn');
    
    deckInfo.innerHTML = '<div class="loading">Creating new deck...</div>';
    drawnCards.innerHTML = '';
    
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
    
    makeCardRequest(url)
        .then(data => {
            currentDeckId = data.deck_id;
            remainingCards = data.remaining;
            
            deckInfo.innerHTML = `
                <div class="fact">
                    <strong>Deck ID:</strong> ${currentDeckId}<br>
                    <strong>Cards remaining:</strong> ${remainingCards}
                </div>
            `;
            
            drawCardBtn.disabled = false;
        })
        .catch(error => {
            deckInfo.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
}

function drawCard() {
    if (!currentDeckId) {
        alert('Please create a new deck first!');
        return;
    }
    
    const drawnCards = document.getElementById('drawn-cards');
    const drawCardBtn = document.getElementById('draw-card-btn');
    
    drawCardBtn.disabled = true;
    
    const url = `https://deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=1`;
    
    makeCardRequest(url)
        .then(data => {
            const card = data.cards[0];
            remainingCards = data.remaining;
            
            // Add the new card to the display
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.suit.toLowerCase()}`;
            cardElement.innerHTML = `<strong>${card.value} of ${card.suit}</strong>`;
            drawnCards.appendChild(cardElement);
            
            // Update deck info
            const deckInfo = document.getElementById('deck-info');
            deckInfo.innerHTML = `
                <div class="fact">
                    <strong>Deck ID:</strong> ${currentDeckId}<br>
                    <strong>Cards remaining:</strong> ${remainingCards}
                </div>
            `;
            
            // Enable/disable draw button based on remaining cards
            if (remainingCards > 0) {
                drawCardBtn.disabled = false;
            } else {
                drawCardBtn.innerHTML = 'No cards left!';
                drawCardBtn.disabled = true;
            }
        })
        .catch(error => {
            drawnCards.innerHTML += `<div class="error">Error: ${error.message}</div>`;
            drawCardBtn.disabled = false;
        });
} 