import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';

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

test('renders navigation links for all dogs', () => {
  render(
    <BrowserRouter>
      <Nav dogs={mockDogs} />
    </BrowserRouter>
  );
  
  // Check if all dog names are rendered as links
  mockDogs.forEach(dog => {
    const link = screen.getByText(dog.name);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/dogs/${dog.name.toLowerCase()}`);
  });
}); 