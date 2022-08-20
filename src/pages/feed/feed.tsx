import React, {
  FC,
  useCallback,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import styles from "./feed.module.css";
import { OrderList } from "../../components/order-list/order-list";
import { OrderInfo } from "../../components/order-info/order-info";
import { wsClose, wsInit, wsResetError } from "../../services/actions/ws";
import Preloader from "../../components/preloader/preloader";
import Notification from "../../components/notification/notification";

interface IFeedPage
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const FeedPage: FC<IFeedPage> = () => {
  const dispatch = useAppDispatch();

  const { orders, wsRequest, wsFailed } = useAppSelector((store) => store.ws);

  useEffect(() => {
    dispatch(wsInit());
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(wsResetError());
  }, [dispatch]);

  return (
    <article>
      {wsRequest && !wsFailed && <Preloader />}
      
      {!wsRequest && !wsFailed && orders && (
        <div className={styles.container}>
          <OrderList />
          <OrderInfo />
        </div>
      )}

      {wsFailed && !orders && (
        <Notification
          heading="Не удалось загрузить данные..."
          backHome
          onClose={resetError}
        />
      )}
    </article>
  );
};
