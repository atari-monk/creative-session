import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello, React with TypeScript!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
