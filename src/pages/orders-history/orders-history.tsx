import React, { useEffect, useCallback, FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { wsClose, wsInitWithToken, wsResetError } from "../../services/actions/ws";
import { OrdersComponent } from "../../components/orders-component/orders-component";
import { getCookie } from "../../services/cookie-setting";
import styles from "./orders-history.module.css";
import Preloader from "../../components/preloader/preloader";
import Notification from "../../components/notification/notification";
import { useAppSelector, useAppDispatch } from "../../services/store";

interface IOrderHistory extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const OrdersHistory: FC<IOrderHistory> = () => {
  const dispatch = useAppDispatch();
  const { orders, wsRequest, wsFailed } = useAppSelector((store) => store.ws);
  orders?.reverse();

  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(wsInitWithToken(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    
  }, [dispatch, accessToken]);

  const resetError = useCallback(() => {
    dispatch(wsResetError());
  }, [dispatch]);

  return (
    <div>
    <ul className={styles.list}>
    {wsRequest && !wsFailed && <Preloader />}
      {
          !wsRequest && !wsFailed && orders && orders.length > 0 && (
            <>
              {
                orders.map((order, idx) => (
                  <OrdersComponent key={idx} isHistory order={order} />
                ))
              }
            </>
          )
        }
    </ul>
    {wsFailed && !orders && <Notification heading="Не удалось загрузить данные..." backHome onClose={resetError} />}
    </div>
  );
};
