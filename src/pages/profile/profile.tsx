import React, { useCallback,FC,DetailedHTMLProps, HTMLAttributes } from "react";
import { NavLink, useHistory, Route } from 'react-router-dom';
import styles from './profile.module.css';
import { ProfileForm } from "../../components/profile-form/profile-form";
import { logoutUser } from "../../services/actions/user";
import { OrdersHistory } from "../orders-history/orders-history";
import { useAppDispatch, useAppSelector } from '../../services/store';

interface IProfile extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const ProfilePage:FC<IProfile> = () => {


  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());

    history.replace({ pathname: '/login' });
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