import React, { useState, useEffect }  from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

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
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        
      </main>
    </div>
  );
}

export default App;
