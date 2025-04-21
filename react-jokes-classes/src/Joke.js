import React from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons and lock functionality. */

function Joke({ id, vote, votes, text, locked, toggleLock }) {
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={() => vote(id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={() => vote(id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        <button onClick={() => toggleLock(id)} className="Joke-lock">
          <i className={`fas fa-${locked ? "lock" : "lock-open"}`} />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;
