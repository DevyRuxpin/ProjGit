// Person component with all required functionality
const Person = (props) => {
  // Truncate name if longer than 8 characters
  const displayName = props.name.length > 8 ? props.name.substring(0, 6) : props.name;
  
  return (
    <div className="person">
      <p>Learn some information about this person</p>
      <h2>Name: {displayName}</h2>
      <p>Age: {props.age}</p>
      
      {/* Age-based conditional rendering */}
      {props.age >= 18 ? (
        <h3>please go vote!</h3>
      ) : (
        <h3>you must be 18</h3>
      )}
      
      {/* Hobbies list */}
      {props.hobbies && props.hobbies.length > 0 && (
        <div>
          <h4>Hobbies:</h4>
          <ul>
            {props.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// App component that renders multiple Person components
const App = () => {
  return (
    <div>
      <Person 
        name="John" 
        age={25} 
        hobbies={["reading", "hiking", "cooking"]} 
      />
      <Person 
        name="Elizabeth" 
        age={16} 
        hobbies={["painting", "dancing", "swimming", "photography"]} 
      />
      <Person 
        name="Michael" 
        age={30} 
        hobbies={["coding", "gaming", "traveling"]} 
      />
    </div>
  );
};

// Add CSS styling
const style = document.createElement('style');
style.textContent = `
  .person {
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 15px 0;
    background-color: #f8f9fa;
    max-width: 400px;
  }
  
  .person h2 {
    color: #333;
    margin: 10px 0;
  }
  
  .person h3 {
    color: #007bff;
    margin: 10px 0;
  }
  
  .person h4 {
    color: #555;
    margin: 15px 0 5px 0;
  }
  
  .person ul {
    margin: 5px 0;
    padding-left: 20px;
  }
  
  .person li {
    margin: 3px 0;
  }
`;
document.head.appendChild(style);

// Render the App component to the DOM
ReactDOM.render(<App />, document.getElementById('root')); 