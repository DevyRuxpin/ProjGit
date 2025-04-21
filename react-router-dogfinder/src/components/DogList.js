import React from 'react';
import { Link } from 'react-router-dom';

function DogList({ dogs }) {
  return (
    <div className="DogList">
      <h1>All Dogs</h1>
      <div className="DogList-dogs">
        {dogs.map(dog => (
          <div key={dog.name} className="DogList-dog">
            <img src={dog.src} alt={dog.name} />
            <h2>
              <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogList; 