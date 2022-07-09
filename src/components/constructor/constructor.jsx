import React, { useEffect, useCallback } from 'react';
import {
    Switch, Route, useLocation, useHistory,
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
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage } from '../../pages';
import { checkAuth } from '../../services/actions/user';
import { clearConstructor } from '../../services/actions/constructor';

export const Constructor = () => {
    const { orderRequest,
        orderFailed,
        orderNumber } = useSelector(store => store.order);

    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const dispatch = useDispatch();

    const location = useLocation();
    const background = location.state && location.state.background;
    const history = useHistory();

    const closeIngredientDetailModal = useCallback(
        path => {
            dispatch(closeDetailModal());
            history.push(path);
        },
        [dispatch, history]
    );

    const closeOrderDetailModal = useCallback(() => {
        dispatch(closeOrderModal());
        dispatch(clearConstructor());
    }, [dispatch]);

    useEffect(() => {
        dispatch(checkAuth(`Bearer ${accessToken}`, refreshToken));
        dispatch(getIngredients());
    }, [dispatch, accessToken, refreshToken]);

    const modalOrder = (
        <Modal title='' onClose={closeOrderDetailModal}>
            <OrderDetails />
        </Modal>
    );

    const modalDetail = (
        <Route path="/ingredients/:id">
        <Modal title='Детали ингредиента' onClose={() => closeIngredientDetailModal('/')}>
            <IngredientDetails />
        </Modal>
        </Route>
    );

    return (
        <div className={`${styles.constructor} mb-10`}>
            <Switch location={background || location}>
                <Route exact path="/">
                    <MainContent />
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
                    <IngredientDetails title="Детали ингредиента" />
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
                background && modalDetail
            }

            {
                orderNumber && modalOrder
            }

        </div>
    )

}
