import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { initialIngredients } from '../../utils/mock-data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const sourceUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [initialData, setInitialData] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [pickedIngredients, setPickedIngredients] = useState(initialIngredients);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [isOrderModalOpened, setOrderModal] = useState(false);
  const [isDetailModalOpened, setDetailModal] = useState(false);

  const toggleOrderModal = () => setOrderModal(!isOrderModalOpened);
  const toggleDetailModal = () => setDetailModal(!isDetailModalOpened);

  const onItemClick = (item) => {
    setSelectedIngredient(item);
    toggleDetailModal();
  }


  const getData = () => {
    setInitialData({ ...initialData, hasError: false, isLoading: true });
    fetch(sourceUrl)
      .then(res => res.json())
      .then(res => setInitialData({ ...initialData, data: res.data, isLoading: false }))
      .catch(e => {
        setInitialData({ ...initialData, hasError: true, isLoading: false });
      });
  };

  useEffect(getData, []);

  const modalOrder = (
    <Modal title='' onClose={toggleOrderModal}>
      <OrderDetails />
    </Modal>
  );

  const modalDetail = (
    <Modal title='Детали ингредиента' onClose={toggleDetailModal}>
      <IngredientDetails ingredient={selectedIngredient} />
    </Modal>
  );


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients availableIngredients={initialData.data} onItemClick={onItemClick} />
        <BurgerConstructor order={pickedIngredients} onOrderClick={toggleOrderModal} />
      </main>

      {
        isDetailModalOpened && modalDetail
      }

      {
        isOrderModalOpened && modalOrder
      }
    </div>
  );
}

export default App;
