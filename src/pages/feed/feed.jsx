import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './feed.module.css';
import { OrderList } from '../../components/order-list/order-list';
import { OrderInfo } from "../../components/order-info/order-info";
import { wsAllOrdersConnectionStart, wsAllOrdersConnectionClosed } from '../../services/actions/ws';

export const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsAllOrdersConnectionStart());

    return () => {
      dispatch(wsAllOrdersConnectionClosed());
    };
  }, [dispatch]);

  return (
    <article className={styles.container}>
      <OrderList />
      <OrderInfo />
    </article>
  );
};