import React, { useMemo } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';
import { setPickedIngredient } from '../../services/actions/ingredient-detail';
import { useDrag } from "react-dnd";
import { useHistory } from 'react-router-dom';
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IIngredient } from '../../services/types';

interface IIngredientsItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    item: IIngredient
  }

const IngredientsItem:FC<IIngredientsItem> = ({ item }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const { bun, fixings } = useAppSelector(store => store.burgerConstructor);

    const counter = useMemo(() => {
        if (item.type === 'bun' && bun && item._id === bun._id) {
            return 1;
        }

        return fixings && fixings.filter(i => i._id === item._id).length;
    }, [bun, fixings]);

    const [{ isDrag }, drag] = useDrag(
        {
          type: 'ingredient',
          item: item,
          collect: (monitor) => ({
            isDrag: monitor.isDragging(),
          }),
        },
        [bun, fixings]
      );

      const className = `${isDrag ? itemStyles.isDragging : ''} pl-4 pr-4`;

    return(
        <article draggable ref={drag} className={itemStyles.card} onClick={() => {
            dispatch(setPickedIngredient(item));
            history.push(`/ingredients/${item._id}`);
        }}>
            {counter > 0 && <Counter count={counter} size="default"/> }
            <img className={className} src={item.image} alt={item.name} />
            <p className={`${itemStyles.price} text text_type_digits-default mt-1 mb-1`}>{item.price} <CurrencyIcon type="primary"/></p>
            <h3 className={`${itemStyles.title} text text_type_main-default mb-7`}>{item.name}</h3>
        </article>
    );
}

export default IngredientsItem;


