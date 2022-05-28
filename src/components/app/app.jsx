import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerIngredientsContext from '../../context/burger-ingredients-context';

const sourceUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: [],
    order: [],
  });

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
    setState({ ...state, hasError: false, isLoading: true });
    fetch(sourceUrl)
      .then(res => res.json())
      .then(res => setState({
        ...state,
        data: res.data,
        order: [res.data[0], res.data[5], res.data[4], res.data[7], res.data[2]],
        isLoading: false
      }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
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
        {
        !state.isLoading && !state.hasError && state.data.length > 0 &&
          <BurgerIngredientsContext.Provider value={state}>
            <BurgerIngredients onItemClick={onItemClick} />
            <BurgerConstructor onOrderClick={toggleOrderModal} />
          </BurgerIngredientsContext.Provider>
        }
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
