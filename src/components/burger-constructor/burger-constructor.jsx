import React, { useMemo, useContext, useReducer, useEffect } from "react";
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import currency from '../../images/currency-large.png';
import { sendOrder } from "../../services/actions/order";
import { addItem, removeItem } from "../../services/actions/constructor";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {

    const { bun, fixings, totalPrice, productsIds } = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const onOrderClick = (ids) => {
        dispatch(sendOrder(ids));
    }

    const [{isHover}, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addItem(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const handleDelete = (item) => {
        dispatch(removeItem(item));
    }  

    return (
        <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 pb-10`}>
            <ul className={`${isHover ? constructorStyles.dropTarget : constructorStyles.list}`} ref={drop} >
               { bun && <li key={`${bun._id}top`} className={` pl-8 mb-4 pr-4`}>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li> }
                <div className={`${constructorStyles.fixings} pr-2`}>
                    {   fixings && fixings.length > 0 && 
                        fixings.map((item, index) =>
                            <li key={index} className={`${constructorStyles.listElement} mb-4`}>
                                <span className={constructorStyles.dragIcon}>
                                <DragIcon type="primary" />
                                </span>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                    handleClose={() => {handleDelete(item)}}
                                />
                            </li>
                        )
                    }
                </div>
                { bun && <li key={`${bun._id}bottom`} className={`pl-8 mt-4 pr-4`}>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li> }
            </ul>
            <div className={`${constructorStyles.finalize} mt-10 pr-5`}>
                <p className='text text_type_digits-medium mr-3'>{totalPrice} </p>
                <img src={currency} alt="currency" className='mr-10'/>
                <Button type='primary' size='medium' onClick={() => onOrderClick(productsIds)}>Оформить заказ</Button>
            </div>
        </section>
    );
}


export default BurgerConstructor