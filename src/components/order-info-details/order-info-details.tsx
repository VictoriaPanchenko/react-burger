import React, {
  useEffect,
  useCallback,
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import styles from "./order-info-details.module.css";
import Preloader from "../preloader/preloader";
import { getCookie } from "../../services/cookie-setting";
import {
  wsClose,
  wsInit,
  wsInitWithToken,
  wsResetError,
} from "../../services/actions/ws";
import Notification from "../notification/notification";
import { OrderInfoCard } from "../order-info-card/order-info-card";
import { useAppSelector, useAppDispatch } from "../../services/store";

export interface IOrdersInfoDetails
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  isPopup?: boolean;
  personal?: boolean;
}

export const OrdersInfoDetails: FC<IOrdersInfoDetails> = ({
  isPopup,
  personal,
}) => {
  const dispatch = useAppDispatch();
  const { orders, wsOpen, wsRequest, wsFailed } = useAppSelector(
    (store) => store.ws
  );

  const { id } = useParams<{ id: string }>();

  const accessToken = getCookie("accessToken");
  useEffect(() => {
    personal
      ? dispatch(
          wsInitWithToken(
            `wss://norma.nomoreparties.space/orders?token=${accessToken}`
          )
        )
      : dispatch(wsInit());
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, accessToken]);

  const resetError = useCallback(() => {
    dispatch(wsResetError());
  }, [dispatch]);

  const orderInfo = orders?.find((order) => order._id === id);

  return (
    <div>
      {wsRequest && !orders && <Preloader />}

      {orders && wsOpen && orderInfo?.number && (
        <div
          className={styles.container}
          style={!isPopup ? { marginTop: "120px" } : {}}
        >
          <OrderInfoCard />
        </div>
      )}

      {wsFailed && !orders && (
        <Notification
          heading="Не удалось загрузить данные..."
          backHome
          onClose={resetError}
        />
      )}
    </div>
  );
};
