import detailStyles from './ingredient-details.module.css';
import ingredientItemPropType from '../../utils/custom-prop-types';

const IngredientDetails = ({ ingredient }) => {
    return (

        <div className={detailStyles.container}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium mb-8'>{ingredient.name}</p>
            <ul className={`${detailStyles.list} text_color_inactive`}>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Калории,ккал</p>
                    <p className='text text_type_digits-default'>{ingredient.calories}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Белки, г</p>
                    <p className='text text_type_digits-default'>{ingredient.proteins}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Жиры, г</p>
                    <p className='text text_type_digits-default'>{ingredient.fat}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Углеводы, г</p>
                    <p className='text text_type_digits-default'>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>

    );
}

IngredientDetails.propTypes = {
    ingredient: ingredientItemPropType.isRequired
}

export default IngredientDetails;