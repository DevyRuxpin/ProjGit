import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes with voting and lock functionality. */

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load jokes from localStorage on initial render
  useEffect(() => {
    const savedJokes = JSON.parse(localStorage.getItem("jokes"));
    if (savedJokes) {
      setJokes(savedJokes);
      setIsLoading(false);
    } else {
      getJokes();
    }
  }, []);

  // Save jokes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes]);

  /* retrieve jokes from API */
  const getJokes = async () => {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let newJokes = [];
      let seenJokes = new Set(jokes.filter(j => j.locked).map(j => j.id));

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, votes: 0, locked: false });
        } else {
          console.log("duplicate found!");
        }
      }

      // Keep locked jokes and add new ones
      const lockedJokes = jokes.filter(j => j.locked);
      setJokes([...lockedJokes, ...newJokes]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* empty joke list, set to loading state, and then call getJokes */
  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes();
  };

  /* change vote for this id by delta (+1 or -1) */
  const vote = (id, delta) => {
    setJokes(jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    ));
  };

  /* toggle lock status for a joke */
  const toggleLock = (id) => {
    setJokes(jokes.map(j =>
      j.id === id ? { ...j, locked: !j.locked } : j
    ));
  };

  /* reset all votes and clear localStorage */
  const resetVotes = () => {
    setJokes(jokes.map(j => ({ ...j, votes: 0 })));
    localStorage.removeItem("jokes");
  };

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div className="JokeList">
      <div className="JokeList-buttons">
        <button
          className="JokeList-getmore"
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>
        <button
          className="JokeList-reset"
          onClick={resetVotes}
        >
          Reset Votes
        </button>
      </div>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
          locked={j.locked}
          toggleLock={toggleLock}
        />
      ))}
    </div>
  );
}

export default JokeList;
