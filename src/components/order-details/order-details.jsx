import orderDetailStyles from './order-details.module.css';

const OrderDetails = () => {
  return (
    <div className={orderDetailStyles.container}>
      <p className='text text_type_digits-large pt-5 mb-8'>034536</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <div className={orderDetailStyles.icon}></div>
      <p className='text text_type_main-small mb-2 mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-small text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;