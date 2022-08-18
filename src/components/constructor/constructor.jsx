import React, { useEffect, useCallback } from 'react';
import {
    Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../services/cookie-setting';
import styles from './constructor.module.css';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import MainContent from '../main-content/main-content';
import { getIngredients } from '../../services/actions/ingredients';
import { closeOrderModal } from '../../services/actions/order';
import { closeDetailModal } from '../../services/actions/ingredient-detail';
import { cleanOrderInfo } from '../../services/actions/ws';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage, IngredientPage, FeedPage, OrderInfoPage } from '../../pages';
import { checkAuth } from '../../services/actions/user';
import { clearConstructor } from '../../services/actions/constructor';
import { OrdersInfoDetails } from '../order-info-details/order-info-details';
import Preloader from '../preloader/preloader';
import { useAppSelector } from '../../services/store';

export const Constructor = () => {
    const { wsOpen, orders, wsRequest } = useAppSelector((store) => store.ws);
    const location = useLocation();
    const background = location.state && location.state.background;

    const { orderNumber, orderRequest, orderFailed, isOrderDetailModalOpened } = useSelector(store => store.order);

    const { isDetailOpened: openDetailPopUp } = useSelector(store => store.itemDetail);

    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const dispatch = useDispatch();

    const history = useHistory();

    const closeIngredientDetailModal = useCallback(
        path => {
            dispatch(closeDetailModal());
            history.push(path);
        },
        [dispatch, history]
    );

    const closeOrdersModal = useCallback(() => {
        history.goBack();
       // dispatch(cleanOrderInfo());
    }, [dispatch, history]);


    const closeOrderDetailModal = useCallback(() => {
        dispatch(closeOrderModal());
        dispatch(clearConstructor());
    }, [dispatch]);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(getIngredients());
    }, [dispatch]);

    const modalOrder = orderNumber && (
        <Modal title='' onClose={closeOrderDetailModal}>
            <OrderDetails />
        </Modal>
    );

    const modalDetail = (
        <Route exact path="/ingredients/:id">
            <Modal title='Детали ингредиента' onClose={() => closeIngredientDetailModal('/')}>
                <IngredientDetails />
            </Modal>
        </Route>
    );

    const modalOrderDetailFromFeed = (
        <Route exact path="/feed/:id">
            <Modal onClose={() => closeOrdersModal()}>
                <OrdersInfoDetails isPopup />
            </Modal>
        </Route>
    );

    const modalOrderDetailFromProfile = (
        <Route exact path="/profile/orders/:id">
            <Modal onClose={() => closeOrdersModal()}>
                <OrdersInfoDetails isPopup personal />
            </Modal>
        </Route>
    );

    return (
        <div className={`${styles.constructor} mb-10`}>
            <Switch>
                <Route exact path="/">
                    <MainContent />
                </Route>
                <Route exact path="/feed">
                    <FeedPage />
                </Route>
                <Route exact path="/feed/:id">
                    {!isOrderDetailModalOpened && <OrderInfoPage />}
                </Route>
                <Route exact path="/profile/orders/:id">
                    {!isOrderDetailModalOpened && <OrderInfoPage personal/>}
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
                    {
                        !openDetailPopUp &&
                        <IngredientPage />
                    }
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

            {
                isOrderDetailModalOpened && modalOrderDetailFromFeed
            }

            {
                isOrderDetailModalOpened && modalOrderDetailFromProfile
            }

            {
                openDetailPopUp && modalDetail
            }

            {
                (!orderRequest && !orderFailed) ? modalOrder : <Preloader />
            }


        </div>
    )

}

