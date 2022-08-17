import React, { useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import { Constructor } from '../constructor/constructor';
import styles from './app.module.css';
import { BrowserRouter } from 'react-router-dom';

const App = () => (

  <BrowserRouter basename="/react-burger">
    <div className={styles.app}>
      <AppHeader />
      <Constructor />
    </div>
  </BrowserRouter>

);

export default App;

