import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css'
import ingredientItemPropType from '../../utils/custom-prop-types';
import currency from '../../images/currency-large.png'

const BurgerConstructor = ({ order }) => {

    const bun = order[0];
    const fixings = order.slice(1);
    const totalPrice = fixings.reduce((sum, currentItem) => sum + currentItem.price,
        (bun.price * 2));

    return (
        <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 pb-10`}>
            <ul className={`${constructorStyles.list} `}>
                <li className={` pl-8 mb-4 pr-4`}>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li>
                <div className={`${constructorStyles.fixings} pr-2`}>
                    {
                        fixings.map(item =>
                            <li key={item._id} className={`${constructorStyles.listElement} mb-4`}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </li>
                        )
                    }
                </div>
                <li className={`pl-8 mt-4 pr-4`}>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li>
            </ul>
            <div className={`${constructorStyles.finalize} mt-10 pr-5`}>
                <p className='text text_type_digits-medium mr-3'>{totalPrice} </p>
                <img src={currency} alt="currency" className='mr-10'/>
                <Button type='primary' size='medium'>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    order: PropTypes.arrayOf(ingredientItemPropType.isRequired).isRequired
}

export default BurgerConstructor