import orderDetailStyles from './order-details.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderInfo }) => {
  return (
    <div className={orderDetailStyles.container}>
      {orderInfo.hasError
        ?
        <p className='text text_type_main-default'>Произошла ошибка, свяжитесь с оператором или попробуйте еще раз</p>
        :
        <><p className='text text_type_digits-large pt-5 mb-8'>{orderInfo.number}</p><p className='text text_type_main-medium mb-15'>идентификатор заказа</p><div className={orderDetailStyles.icon}></div><p className='text text_type_main-small mb-2 mt-15'>Ваш заказ начали готовить</p><p className='text text_type_main-small text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p></>
      }
    </div>
  );
}

OrderDetails.propTypes = {
  orderInfo: PropTypes.shape({
    number: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired
  })
}

export default OrderDetails;