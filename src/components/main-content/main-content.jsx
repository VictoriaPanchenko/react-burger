import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main-content.module.css';
import Modal from '../modal/modal';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { clearOrderError } from '../../services/actions/order';
import { getIngredients } from '../../services/actions/ingredients';
import { clearIngredientsError } from '../../services/actions/ingredients';


const MainContent = () => {
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
    const { orderFailed } = useSelector(store => store.order);
  
    const dispatch = useDispatch();
  
    const clearErrors = () => {
      dispatch(clearOrderError());
      dispatch(clearIngredientsError());
    };
  
    useEffect(() => {
      dispatch(getIngredients());
    }, [dispatch]);
  
    return (
      <div className={styles.wrapper}>
        {!ingredientsFailed && !ingredientsRequest && (
          <main className={`${styles.content}`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        )}
  
        {(ingredientsFailed || orderFailed) && (
          <Modal heading="Ошибка на сервере" closeModal={clearErrors} />
        )}
      </div>
    );
  };
  
  export default MainContent;
  