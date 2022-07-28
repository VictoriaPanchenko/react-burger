import React, { useCallback } from "react";
import { NavLink, useHistory, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { ProfileForm } from "../../components/profile-form/profile-form";
import { logoutUser, clearPatchUserErr } from "../../services/actions/user";
import { useSelector } from "react-redux";
import { OrdersHistory } from "../orders-history/orders-history";

export const ProfilePage = () => {

  const { user, patchUserRequest, patchUserFailed, isUserChanged, errMessage } = useSelector(
    (store) => store.user
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());

    history.replace({ path: '/login' });
  }, [dispatch, logoutUser, history]);



  return (

    <main className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              to="/profile"
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              exact
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              onClick={handleLogout}
            >
              Выход
            </button>
          </li>
        </ul>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Route path="/profile" exact>
      
        <ProfileForm />
      
 </Route>
      

      <Route path="/profile/orders" exact>
        <OrdersHistory />
      </Route>
    </main>
  )
};