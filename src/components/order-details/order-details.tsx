import React, { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import orderDetailStyles from './order-details.module.css';
import { useAppSelector } from "../../services/store";

interface IOrderDetails
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const OrderDetails:FC<IOrderDetails> = () => {

  const { orderFailed, orderNumber } = useAppSelector(store => store.order);

  return (
    <div className={orderDetailStyles.container}>
      {orderFailed
        ?
        <p className='text text_type_main-default'>Произошла ошибка, свяжитесь с оператором или попробуйте еще раз</p>
        :
        <><p className='text text_type_digits-large pt-5 mb-8'>{orderNumber}</p><p className='text text_type_main-medium mb-15'>идентификатор заказа</p><div className={orderDetailStyles.icon}></div><p className='text text_type_main-small mb-2 mt-15'>Ваш заказ начали готовить</p><p className='text text_type_main-small text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p></>
      }
    </div>
  );
}

export default OrderDetails;