import detailStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

    const {selectedIngredient} = useSelector(s => s.itemDetail);

    return (

        <div className={detailStyles.container}>
            <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
            <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
            <ul className={`${detailStyles.list} text_color_inactive`}>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Калории,ккал</p>
                    <p className='text text_type_digits-default'>{selectedIngredient.calories}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Белки, г</p>
                    <p className='text text_type_digits-default'>{selectedIngredient.proteins}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Жиры, г</p>
                    <p className='text text_type_digits-default'>{selectedIngredient.fat}</p>
                </li>
                <li className={detailStyles.listItem}>
                    <p className='text text_type_main-default mb-2'>Углеводы, г</p>
                    <p className='text text_type_digits-default'>{selectedIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>

    );
}

export default IngredientDetails;