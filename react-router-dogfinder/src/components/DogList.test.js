import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DogList from './DogList';

const mockDogs = [
  {
    name: "Whiskey",
    age: 5,
    src: "whiskey.jpg",
    facts: ["Fact 1", "Fact 2", "Fact 3"]
  },
  {
    name: "Duke",
    age: 3,
    src: "duke.jpg",
    facts: ["Fact 1", "Fact 2", "Fact 3"]
  }
];

test('renders all dogs', () => {
  render(
    <BrowserRouter>
      <DogList dogs={mockDogs} />
    </BrowserRouter>
  );
  
  // Check if all dog names are rendered
  mockDogs.forEach(dog => {
    expect(screen.getByText(dog.name)).toBeInTheDocument();
  });
  
  // Check if the heading is present
  expect(screen.getByText('All Dogs')).toBeInTheDocument();
}); 