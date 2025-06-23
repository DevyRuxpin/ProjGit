// Tweet component with styling
const Tweet = (props) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="username">@{props.username}</span>
        <span className="name">{props.name}</span>
        <span className="date">{props.date}</span>
      </div>
      <div className="tweet-message">
        {props.message}
      </div>
    </div>
  );
};

// App component that renders multiple tweets
const App = () => {
  return (
    <div>
      <Tweet 
        username="john_doe" 
        name="John Doe" 
        date="2024-01-15" 
        message="Just learned React! It's amazing how powerful it is for building user interfaces." 
      />
      <Tweet 
        username="jane_smith" 
        name="Jane Smith" 
        date="2024-01-16" 
        message="Working on a new project today. Can't wait to see how it turns out!" 
      />
      <Tweet 
        username="mike_wilson" 
        name="Mike Wilson" 
        date="2024-01-17" 
        message="Coffee and coding - the perfect combination for a productive day." 
      />
    </div>
  );
};

// Add CSS styling
const style = document.createElement('style');
style.textContent = `
  .tweet {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    background-color: #f9f9f9;
    max-width: 500px;
  }
  
  .tweet-header {
    margin-bottom: 10px;
  }
  
  .username {
    font-weight: bold;
    color: #1da1f2;
    margin-right: 10px;
  }
  
  .name {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .date {
    color: #666;
    font-size: 0.9em;
  }
  
  .tweet-message {
    line-height: 1.4;
  }
`;
document.head.appendChild(style);

// Render the App component to the DOM
ReactDOM.render(<App />, document.getElementById('root')); 