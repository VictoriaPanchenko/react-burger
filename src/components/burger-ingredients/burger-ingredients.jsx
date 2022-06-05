import { useContext } from 'react';
import ingrediensStyles from './burger-ingredients.module.css';
import {getIngredientsByType, categories} from '../../utils/product-types';
import IngredientsNavigation from "../ingredients-navigation/ingredients-navigation";
import IngredientsList from '../ingredients-list/ingredients-list';
import { useDispatch, useSelector } from 'react-redux';


const BurgerIngredients = ( ) => {

    const { ingredients } = useSelector(store => store.ingredients);

    return (
        <section className={`${ingrediensStyles.options} pt-10`}> 
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <IngredientsNavigation tabs={categories} />
            <div className={`${ingrediensStyles.ingrediens} mt-10`}>
                {
                    categories.map((category, index) => (
                        <IngredientsList key={index} 
                        itemsArr={getIngredientsByType(category.type, ingredients)}
                        itemId={category.id} 
                        itemName={category.name} />
                    ))
                }
            </div>
        </section>
    )
};

export default BurgerIngredients;