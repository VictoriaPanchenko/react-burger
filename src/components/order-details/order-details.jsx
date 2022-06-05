import orderDetailStyles from './order-details.module.css';
import { useSelector } from 'react-redux';

const OrderDetails = () => {

  const { orderFailed, orderNumber } = useSelector(store => store.order);

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