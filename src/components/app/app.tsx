import React from 'react';
import AppHeader from '../app-header/app-header';
import { Constructor } from '../constructor/constructor';
import styles from './app.module.css';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../services/store";
import { useState, useEffect, useCallback } from "react";
import { getIngredients } from '../../services/actions/ingredients';


const App = () => {
const dispatch = useAppDispatch();
 

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  
  return (
  <BrowserRouter basename="/react-burger">
    <div className={styles.app}>
      <AppHeader />
      <Constructor />
    </div>
  </BrowserRouter>)

};

export default App;

