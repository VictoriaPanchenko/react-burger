import React, { useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import { Constructor } from '../constructor/constructor';
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Constructor />
  </div>
);

export default App;
