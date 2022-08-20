import React, { forwardRef } from 'react';
import IngredientsItem from '../ingredients-item/ingredients-item';
import listStyles from './ingredients-list.module.css';
import { IIngredient, TIngredientsType } from '../../services/types';

interface IIngredientList {
    itemsArr: IIngredient[];
    itemType: TIngredientsType;
  }

const IngredientsList = forwardRef<HTMLUListElement, IIngredientList>(({ itemsArr, itemType }, ref) => {
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

export default IngredientsList;