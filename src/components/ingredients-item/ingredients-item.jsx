import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';
import ingredientItemPropType from '../../utils/custom-prop-types';
import { setPickedIngredient } from '../../services/actions/ingredient-detail';
import { useDispatch, useSelector } from 'react-redux';

const IngredientsItem = ({ item }) => {
    const dispatch = useDispatch();

    return(
        <article draggable className={itemStyles.card} onClick={() => dispatch(setPickedIngredient(item))}>
            <Counter count={1} size="default"/>
            <img className='pl-4 pr-4' src={item.image} alt={item.name} />
            <p className={`${itemStyles.price} text text_type_digits-default mt-1 mb-1`}>{item.price} <CurrencyIcon/></p>
            <h3 className={`${itemStyles.title} text text_type_main-default mb-7`}>{item.name}</h3>
        </article>
    );
}

IngredientsItem.propTypes = {
    item: ingredientItemPropType.isRequired
}

export default IngredientsItem;


