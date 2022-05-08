import React, { useState, useEffect }  from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { pickedIngredients } from '../../utils/mock-data';

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
      .then(res => setState({ ...state, data: res.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  useEffect(getData, []);



  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
      <BurgerIngredients availableIngredients={state.data} />
      <BurgerConstructor order={pickedIngredients}/>
      </main>    
    </div>
  );
}

export default App;
