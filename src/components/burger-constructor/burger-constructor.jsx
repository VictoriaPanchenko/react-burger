import React, { useMemo, useContext, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import currency from '../../images/currency-large.png';
import BurgerIngredientsContext from "../../context/burger-ingredients-context";

const BurgerConstructor = ({ onOrderClick }) => {

    const constructorContext = useContext(BurgerIngredientsContext);
    
    const bun = constructorContext.order.find(el => el.type === 'bun');
    const fixings = constructorContext.order.filter(el => el.type !== 'bun');

    const order = useMemo(() => {
        return {
            bun,
            fixings
        }
    }, [constructorContext]);

    const initialTotalPrice = 0;

    const reducer = (state, action) => {
        switch (action.type) {
            case "update":
                return order.fixings.reduce((sum, currentItem) => sum + currentItem.price, order.bun.price * 2);
            default:
                throw new Error(`Unsupported type of action: ${action.type}`);
        }
    }

    const [totalPrice, dispatch] = useReducer(reducer, initialTotalPrice);

    //calculate total price
    useEffect(() => dispatch({ type: "update"}), [order]);

    return (
        <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 pb-10`}>
            <ul className={`${constructorStyles.list} `}>
                <li key={`${order.bun._id}top`} className={` pl-8 mb-4 pr-4`}>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${order.bun.name} (верх)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image_mobile}
                    />
                </li>
                <div className={`${constructorStyles.fixings} pr-2`}>
                    {
                        order.fixings.map((item, index) =>
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
                <li key={`${order.bun._id}bottom`} className={`pl-8 mt-4 pr-4`}>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${order.bun.name} (низ)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image_mobile}
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
    onOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor