import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import IngredientsItem from '../ingredients-item/ingredients-item';
import listStyles from './ingredients-list.module.css';
import ingredientItemPropType from '../../utils/custom-prop-types';
import { categoryPropType } from '../../utils/product-types';

const IngredientsList = forwardRef(({ itemsArr, itemType }, ref) => {
    return (
        <div className={`${listStyles.wrapper} mb-10`}>
            <h2 id={itemType.type} className='text text_type_main-medium mb-6'>{itemType.name}</h2>
            <ul className={`${listStyles.list} pr-2 pl-4`} ref={ref}>
                {
                    itemsArr.map(item =>
                        <li key={item._id}>
                            <IngredientsItem item={item} />
                        </li>
                    )
                }
            </ul>
        </div>
    );
});

IngredientsList.propTypes = {
    itemsArr: PropTypes.arrayOf(ingredientItemPropType.isRequired).isRequired,
    itemType: categoryPropType.isRequired
};

export default IngredientsList;