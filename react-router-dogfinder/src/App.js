import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import DogList from './components/DogList';
import DogDetails from './components/DogDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Nav dogs={App.defaultProps.dogs} />
      <Switch>
        <Route exact path="/dogs">
          <DogList dogs={App.defaultProps.dogs} />
        </Route>
        <Route path="/dogs/:name">
          <DogDetails dogs={App.defaultProps.dogs} />
        </Route>
        <Redirect to="/dogs" />
      </Switch>
    </Router>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: "https://placedog.net/400/300?id=1",
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: "https://placedog.net/400/300?id=2",
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: "https://placedog.net/400/300?id=3",
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: "https://placedog.net/400/300?id=4",
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
};

export default App;
