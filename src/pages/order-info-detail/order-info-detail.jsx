import React from 'react';
import { OrdersInfoDetails } from '../../components/order-info-details/order-info-details';
import styles from './order-info-detail.module.css';

export const OrderInfoPage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.order}>
        <OrdersInfoDetails />
      </section>
    </main>
  );
};
