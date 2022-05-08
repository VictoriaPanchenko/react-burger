import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';

const IngredientsItem = ({ name, image, price }) => {

    return(
        <article className={itemStyles.card}>
            <Counter count={1} size="default"/>
            <img className='pl-4 pr-4' src={image} alt={name} />
            <p className={`${itemStyles.price} text text_type_digits-default mt-1 mb-1`}>{price} <CurrencyIcon/></p>
            <h3 className={`${itemStyles.title} text text_type_main-default mb-7`}>{name}</h3>
        </article>
    );
}

IngredientsItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default IngredientsItem;


