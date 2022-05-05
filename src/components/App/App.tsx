import React, { useState, useEffect }  from 'react';
import './App.module.css';

const sourceUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  
  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(sourceUrl)
      .then(res => res.json())
      .then(data => setState({ ...state, data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  useEffect(getData, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
