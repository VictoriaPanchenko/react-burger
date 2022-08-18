import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './order-list.module.css';
import { OrdersComponent } from "../orders-component/orders-component";
import Preloader from "../preloader/preloader";
import { useAppSelector } from '../../services/store';

interface IOrdersList
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const OrderList: FC<IOrdersList> = () => {
  const { orders } = useAppSelector((store) => store.ws);

  return (
    <div className={styles.main_container}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div
        className={`${styles.orders_container} mt-10 ingredients-container`}
      >
        {
          orders != null && orders.length > 0 ? (
            <ul className={`${styles.list} pt-6 pb-10 pr-4 pl-4`}>
              {
                orders?.map((order, idx) => (
                  <OrdersComponent key={idx} isHistory={false} order={order} />
                ))
              }
            </ul>
          ) : (<Preloader />)
        }
      </div>
    </div>
  );
};