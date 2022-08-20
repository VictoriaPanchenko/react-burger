import React, { useEffect, useCallback } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import styles from "./constructor.module.css";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ProtectedRoute } from "../protected-route/protected-route";
import MainContent from "../main-content/main-content";
import { closeOrderModal } from "../../services/actions/order";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngredientPage,
  FeedPage,
  OrderInfoPage,
} from "../../pages";
import { checkAuth } from "../../services/actions/user";
import { clearConstructor } from "../../services/actions/constructor";
import { OrderInfoCard } from "../order-info-card/order-info-card";
import Preloader from "../preloader/preloader";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";

interface IConstructor
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Constructor: FC<IConstructor> = () => {
  const location = useLocation<any>();
  const history = useHistory();
  const background = location?.state?.background;
  const from = location?.state?.from;

  // при перезагрузке страницы будет открываться отдельная страничка, а не модалка
  // const background = history.action === 'PUSH' && location.state?.background;

  const { orderNumber, orderRequest, orderFailed } =
    useAppSelector((store) => store.order);

  const dispatch = useAppDispatch();
  const closeModal = useCallback(
    (path) => {
      history.push(path);
    },
    [dispatch, history]
  );

  const closeOrderDetailModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch(clearConstructor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const modalOrder = orderNumber && (
    <Modal title="" onClose={closeOrderDetailModal}>
      <OrderDetails />
    </Modal>
  );

  const modalDetail = (
    <Route exact path="/ingredients/:id">
      <Modal
        title="Детали ингредиента"
        onClose={() => closeModal("/")}>
        <IngredientDetails />
      </Modal>
    </Route>
  );

  const modalOrderDetailFromFeed = (
    <Route exact path={`/feed/:id`}>
      <Modal onClose={() => closeModal(`/feed`)}>
        <OrderInfoCard />
      </Modal>
    </Route>
  );

  const modalOrderDetailFromProfile = (
    <Route exact path={`/profile/orders/:id`}>
      <Modal onClose={() => closeModal(`/profile/orders`)}>
        <OrderInfoCard />
      </Modal>
    </Route>
  );

  return (
    <div className={`${styles.constructor} mb-10`}>
      <Switch location={background || location}>
        <Route exact path="/">
          <MainContent />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact path="/feed/:id">
          <OrderInfoPage />
        </Route>
        <Route exact path="/profile/orders/:id">
          <OrderInfoPage personal />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/ingredients/:id">
           <IngredientPage />
        </Route>

        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {background && modalOrderDetailFromFeed}

      {background && modalOrderDetailFromProfile}

      {background && modalDetail}

      {!orderRequest && !orderFailed ? modalOrder : <Preloader />}
    </div>
  );
};
