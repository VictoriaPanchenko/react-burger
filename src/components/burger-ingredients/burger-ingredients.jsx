import PropTypes from 'prop-types';
import ingrediensStyles from './burger-ingredients.module.css';
import {getIngredientsByType, ingredientTypes} from '../../utils/product-types';
import ingredientItemPropType from '../../utils/custom-prop-types';
import IngredientsNavigation from "../ingredients-navigation/ingredients-navigation";
import IngredientsList from '../ingredients-list/ingredients-list';

const BurgerIngredients = ( {availableIngredients, onItemClick} ) => {

    return (
        <section className={`${ingrediensStyles.options} pt-10`}> 
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <IngredientsNavigation tabs={ingredientTypes.map(el => el.name)} />
            <div className={`${ingrediensStyles.ingrediens} mt-10`}>
                {
                    ingredientTypes.map((type, index) => (
                        <IngredientsList key={index} itemsArr={getIngredientsByType(type.type, availableIngredients)} itemName={type.name}
                        onItemClick={onItemClick} />
                    ))
                }
            </div>
        </section>
    )
};

BurgerIngredients.propTypes = {
    availableIngredients: PropTypes.arrayOf(ingredientItemPropType.isRequired).isRequired,
    onItemClick: PropTypes.func.isRequired
  }

export default BurgerIngredients;