import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerIngredientsContext from '../../context/burger-ingredients-context';

const getIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
const postOrderUrl = 'https://norma.nomoreparties.space/api/orders';

function App() {

  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: [],
    order: [],
  });

  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [isOrderModalOpened, setOrderModal] = useState(false);
  const [isDetailModalOpened, setDetailModal] = useState(false);

  const sendOrder = () => {
    // get ids of selected ingredients
    const productIds = state.order.map(item => item._id);

    // get order's number
    getOrderNumber(productIds);

    //toggle state of modal
    toggleOrderModal();
  }

  const toggleOrderModal = () => setOrderModal(!isOrderModalOpened);
  const toggleDetailModal = () => setDetailModal(!isDetailModalOpened);

  const onItemClick = (item) => {
    setSelectedIngredient(item);
    toggleDetailModal();
  }

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(getIngredientsUrl)
      .then(res => res.json())
      .then(res => setState({
        ...state,
        data: res.data,
        order: [res.data[0], res.data[3], res.data[7], res.data[2], res.data[5], res.data[4]],
        isLoading: false
      }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  //  get order's number and set it to state
  const getOrderNumber = (productIds) => {
    fetch(postOrderUrl, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST',
      body: JSON.stringify({ ingredients: productIds})
    })
    .then(res => res.json())
    .then(res => setOrderInfo({
      number: res.order.number,
      hasError: false
    }))
    .catch(e => setOrderInfo({
      number: 0,
      hasError: true
    }))
  }

  useEffect(getData, []);

  const modalOrder = (
    <Modal title='' onClose={toggleOrderModal}>
      <OrderDetails orderInfo={orderInfo} />
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
            <BurgerConstructor onOrderClick={sendOrder} />
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
