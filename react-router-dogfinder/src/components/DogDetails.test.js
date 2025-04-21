import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import DogDetails from './DogDetails';

const mockDogs = [
  {
    name: "Whiskey",
    age: 5,
    src: "whiskey.jpg",
    facts: ["Fact 1", "Fact 2", "Fact 3"]
  }
];

test('renders dog details when dog exists', () => {
  render(
    <BrowserRouter>
      <Route path="/dogs/:name">
        <DogDetails dogs={mockDogs} />
      </Route>
    </BrowserRouter>
  );
  
  // Mock the URL to include a valid dog name
  window.history.pushState({}, '', '/dogs/whiskey');
  
  // Check if dog details are rendered
  expect(screen.getByText('Whiskey')).toBeInTheDocument();
  expect(screen.getByText('5 years old')).toBeInTheDocument();
  mockDogs[0].facts.forEach(fact => {
    expect(screen.getByText(fact)).toBeInTheDocument();
  });
});

test('redirects when dog does not exist', () => {
  render(
    <BrowserRouter>
      <Route path="/dogs/:name">
        <DogDetails dogs={mockDogs} />
      </Route>
    </BrowserRouter>
  );
  
  // Mock the URL to include a non-existent dog name
  window.history.pushState({}, '', '/dogs/nonexistent');
  
  // The component should redirect to /dogs
  expect(window.location.pathname).toBe('/dogs');
}); 