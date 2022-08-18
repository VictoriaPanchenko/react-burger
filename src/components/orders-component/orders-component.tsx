import React, { useCallback, FC, DetailedHTMLProps, LiHTMLAttributes } from "react";
import { IIngredient, IWsOrder } from "../../services/types";
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orders-component.module.css";
import { formatDate } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { openOrderDetailModal } from "../../services/actions/order";


interface IOrdersComponent extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  order: IWsOrder;
  isHistory: boolean
}

export const OrdersComponent: FC<IOrdersComponent> = ({ order, isHistory = false }) => {

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch(openOrderDetailModal());
  }, [dispatch, openOrderDetailModal]);

  const location = useLocation();

  const {
    status, number, createdAt, name, ingredients, _id
  } = order;
  const { ingredientsArray } = useAppSelector((store) => store.ingredients);

  const findIngredient = (product: string, products:IIngredient[]) => products.find((foundIngredient) => foundIngredient._id === product);

  const checkStatus = (condition:string) => {
    if (condition === 'done') {
      return 'Выполнен';
    }
  };

  const calculateSum = () => {
    let sum = 0;
    ingredients.forEach((ingredient) => {
      const find = ingredientsArray.find((orderIngredient) => orderIngredient._id === ingredient);
      if (find?.price) {
        sum += find.price;
      }
    });
    return sum;
  };

  return (
    <li>

      <Link
        className={styles.link}
        to={{
          pathname: `${location.pathname}/${_id}`,
          state: { background: location },
        }}
        onClick={openModal}
      >

        <div className={styles.header}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</p>
        </div>

        <h2 className="text text_type_main-medium" style={{ textAlign: "left" }} >{name}</h2>
        {
          (status && isHistory) && <p className="text text_type_main-default" style={{ textAlign: "left" }} >{checkStatus(status)}</p>
        }

        <div className={styles.footer}>
          <ul className={styles.ingredients_list}>
            {
              ingredients.map((ingredient, idx) => {
                const foundIngredient = findIngredient(ingredient, ingredientsArray);
                if (idx < 5) {
                  return (
                    <li key={idx} style={{ zIndex: 9 - idx }} className={styles.ingredients_list_item}>
                      <img
                        className={styles.ingredients_list_item_image}
                        src={foundIngredient?.image}
                        alt={foundIngredient?.name}
                      />
                    </li>
                  );
                } if (idx === 6) {
                  return (
                    <li key={idx} style={{ zIndex: 9 - idx }} className={styles.last_ingredient}>
                      <img
                        className={styles.last_ingredient_image}
                        src={foundIngredient?.image}
                        alt={foundIngredient?.name}
                      />
                      <div className={styles.overlay} />
                      <span className={`text text_type_main-default ${styles.last_ingredient_count}`}>
                        +
                        {ingredients.length - 5}
                      </span>
                    </li>
                  );
                }
                return null;
              })
            }

          </ul>
          <div className={styles.total}>
            <span className="text text_type_digits-default">{calculateSum()}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </Link>
    </li>
  );
};