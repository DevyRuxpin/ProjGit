import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ dogs }) {
  return (
    <nav>
      {dogs.map(dog => (
        <Link key={dog.name} to={`/dogs/${dog.name.toLowerCase()}`}>
          {dog.name}
        </Link>
      ))}
    </nav>
  );
}

export default Nav; 