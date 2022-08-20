import React, { FC } from 'react';
import { OrdersInfoDetails } from '../../components/order-info-details/order-info-details';
import { IOrdersInfoDetails } from '../../components/order-info-details/order-info-details';
import styles from './order-info-detail.module.css';

export const OrderInfoPage:FC<IOrdersInfoDetails> = ({personal}) => {
  return (
    <main className={styles.content}>
      <section className={styles.order}>
        <OrdersInfoDetails personal={personal} />
      </section>
    </main>
  );
};
