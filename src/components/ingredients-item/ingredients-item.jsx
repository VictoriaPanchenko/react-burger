import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';
import ingredientItemPropType from '../../utils/custom-prop-types';

const IngredientsItem = ({ item, onItemClick }) => {

    return(
        <article className={itemStyles.card} onClick={() => onItemClick(item)}>
            <Counter count={1} size="default"/>
            <img className='pl-4 pr-4' src={item.image} alt={item.name} />
            <p className={`${itemStyles.price} text text_type_digits-default mt-1 mb-1`}>{item.price} <CurrencyIcon/></p>
            <h3 className={`${itemStyles.title} text text_type_main-default mb-7`}>{item.name}</h3>
        </article>
    );
}

IngredientsItem.propTypes = {
    item: ingredientItemPropType.isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default IngredientsItem;


