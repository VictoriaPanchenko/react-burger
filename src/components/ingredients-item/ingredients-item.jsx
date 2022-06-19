import React, { useMemo } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';
import ingredientItemPropType from '../../utils/custom-prop-types';
import { setPickedIngredient } from '../../services/actions/ingredient-detail';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

const IngredientsItem = ({ item }) => {
    const dispatch = useDispatch();

    const { bun, fixings } = useSelector(store => store.burgerConstructor);

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
        <article draggable ref={drag} className={itemStyles.card} onClick={() => dispatch(setPickedIngredient(item))}>
            {counter > 0 && <Counter count={counter} size="default"/> }
            <img className={className} src={item.image} alt={item.name} />
            <p className={`${itemStyles.price} text text_type_digits-default mt-1 mb-1`}>{item.price} <CurrencyIcon/></p>
            <h3 className={`${itemStyles.title} text text_type_main-default mb-7`}>{item.name}</h3>
        </article>
    );
}

IngredientsItem.propTypes = {
    item: ingredientItemPropType.isRequired
}

export default IngredientsItem;


