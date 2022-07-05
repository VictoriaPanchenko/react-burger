import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import  { ProtectedRoute } from '../protected-route/protected-route';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProvideAuth } from '../../services/auth';
import styles from './app.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/ingredients';
import { closeOrderModal } from '../../services/actions/order';
import { closeDetailModal } from '../../services/actions/ingredient-detail';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage } from '../../pages';

function App() {

  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
  const { isDetailOpened } = useSelector(store => store.itemDetail);
  const { isOrderModalOpened } = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const closeOrder = useCallback(() => {
    dispatch(closeOrderModal());
  }, [dispatch]);

  const closeDetail = useCallback(() => {
    dispatch(closeDetailModal());
  }, [dispatch]);

  
  const modalOrder = (
    <Modal title='' onClose={closeOrder}>
      <OrderDetails />
    </Modal>
  );

  const modalDetail = (
    <Modal title='Детали ингредиента' onClose={closeDetail}>
      <IngredientDetails />
    </Modal>
  );


  return (

    <ProvideAuth>
    <Router>
    <AppHeader />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </ProvideAuth>


  /*  <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {
          !ingredientsRequest && !ingredientsFailed &&

          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        }
      </main>

      {
        isDetailOpened && modalDetail
      }

      {
        isOrderModalOpened && modalOrder
      }
    </div>*/
  );
}

export default App;
