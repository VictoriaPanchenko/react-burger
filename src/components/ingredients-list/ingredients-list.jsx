import PropTypes from 'prop-types';
import IngredientsItem from '../ingredients-item/ingredients-item';
import listStyles from './ingredients-list.module.css';
import ingridientItemPropType from '../../utils/custom-prop-types';

const IngredientsList = ({itemsArr, itemName}) => {
    return (
        <div className={`${listStyles.wrapper} mb-10`}>
            <h2 className='text text_type_main-medium mb-6'>{itemName}</h2>
            <ul className={`${listStyles.list} pr-2 pl-4`}>
                {                    
                    itemsArr.map( item => 
                        <li key={item._id}>
                            <IngredientsItem name={item.name} image={item.image} price={item.price} />
                        </li>
                        )
                }
            </ul>
        </div>
        

    );
}

IngredientsList.propTypes = {
  itemsArr: PropTypes.arrayOf(ingridientItemPropType.isRequired).isRequired,
  itemName: PropTypes.string.isRequired
};

export default IngredientsList;