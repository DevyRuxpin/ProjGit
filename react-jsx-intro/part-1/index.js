// FirstComponent - renders an h1 with "My very first component"
const FirstComponent = () => {
  return <h1>My very first component</h1>;
};

// NamedComponent - renders a p that accepts a "name" property
const NamedComponent = (props) => {
  return <p>My name is {props.name}</p>;
};

// App - renders a div with instances of the other two components
const App = () => {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="John" />
    </div>
  );
};

// Render the App component to the DOM
ReactDOM.render(<App />, document.getElementById('root')); 