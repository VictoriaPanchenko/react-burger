import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main-content.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { clearOrderError } from "../../services/actions/order";
import { getIngredients } from "../../services/actions/ingredients";
import { clearIngredientsError } from "../../services/actions/ingredients";
import Notification from "../notification/notification";
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";

interface IMainContent
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const MainContent: FC<IMainContent> = () => {
  const { ingredientsRequest, ingredientsFailed } = useAppSelector(
    (store) => store.ingredients
  );
  const { orderFailed } = useAppSelector((store) => store.order);

  const dispatch = useAppDispatch();

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
        <Notification
          heading="Не удалось загрузить данные..."
          backHome
          onClose={clearErrors}
        />
      )}
    </div>
  );
};

export default MainContent;
