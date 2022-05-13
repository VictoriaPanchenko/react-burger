import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css'
import ingredientItemPropType from '../../utils/custom-prop-types';
import currency from '../../images/currency-large.png'

const BurgerConstructor = ({ order, onOrderClick }) => {
    const bun = useMemo(() => order.find(el => el.type === 'bun'), [order]);
    const fixings = useMemo(() => order.filter(el => el.type !== 'bun'), [order]);
    const totalPrice = useMemo(() => fixings.reduce((sum, currentItem) => sum + currentItem.price,
        (bun.price * 2)), [bun, fixings]);

    return (
        <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 pb-10`}>
            <ul className={`${constructorStyles.list} `}>
                <li key={`${bun._id}top`} className={` pl-8 mb-4 pr-4`}>
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
                        fixings.map((item, index) =>
                            <li key={index} className={`${constructorStyles.listElement} mb-4`}>
                                <span className={constructorStyles.dragIcon}>
                                <DragIcon type="primary" />
                                </span>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </li>
                        )
                    }
                </div>
                <li key={`${bun._id}bottom`} className={`pl-8 mt-4 pr-4`}>
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
                <Button type='primary' size='medium' onClick={onOrderClick}>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    order: PropTypes.arrayOf(ingredientItemPropType.isRequired).isRequired,
    onOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor