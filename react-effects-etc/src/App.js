import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a new deck when component mounts
  useEffect(() => {
    createNewDeck();
  }, []);

  const createNewDeck = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await response.json();
      
      if (data.success) {
        setDeckId(data.deck_id);
        setRemainingCards(data.remaining);
        setCurrentCard(null);
      } else {
        alert('Error: Failed to create deck');
      }
    } catch (error) {
      alert('Error: Failed to create deck');
      console.error('Error creating deck:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const drawCard = async () => {
    if (!deckId || remainingCards === 0) {
      alert('Error: no cards remaining!');
      return;
    }

    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentCard(data.cards[0]);
        setRemainingCards(data.remaining);
      } else {
        alert('Error: Failed to draw card');
      }
    } catch (error) {
      alert('Error: Failed to draw card');
      console.error('Error drawing card:', error);
    }
  };

  const shuffleDeck = async () => {
    if (!deckId || isShuffling) return;

    try {
      setIsShuffling(true);
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      const data = await response.json();
      
      if (data.success) {
        setRemainingCards(data.remaining);
        setCurrentCard(null);
      } else {
        alert('Error: Failed to shuffle deck');
      }
    } catch (error) {
      alert('Error: Failed to shuffle deck');
      console.error('Error shuffling deck:', error);
    } finally {
      setIsShuffling(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      
      <div className="card-container">
        {currentCard && (
          <div className="card">
            <img src={currentCard.image} alt={`${currentCard.value} of ${currentCard.suit}`} />
            <p>{currentCard.value} of {currentCard.suit}</p>
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={drawCard} disabled={remainingCards === 0}>
          Draw Card ({remainingCards} remaining)
        </button>
        
        <button 
          onClick={shuffleDeck} 
          disabled={isShuffling || remainingCards === 52}
        >
          {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </button>
      </div>
    </div>
  );
}

export default App; 