import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {

    const { pathname } = useLocation();
    const { user } = useSelector(store => store.user);


    return (
        <header className={`${appHeaderStyles.header} pt-4 pb-4`} >
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.wrapper}>
                    <menu className={appHeaderStyles.menuList}>
                        <li className="pr-5 pl-5">
                            <NavLink
                                activeClassName={appHeaderStyles.linkActive}
                                className={`${appHeaderStyles.link} text text_type_main-default`}
                                exact
                                to="/"
                            >
                                <BurgerIcon type="primary" />
                                <p className="text text_type_main-default ml-2">Конструктор</p>

                            </NavLink>
                        </li>
                        <li className="pr-5 pl-5 ml-2">
                            <NavLink
                                activeClassName={appHeaderStyles.linkActive}
                                className={`${appHeaderStyles.link} text text_type_main-default`}
                                exact
                                to="/profile/orders"
                            >
                                <ListIcon type='secondary' />
                                <p className="text text_type_main-default ml-2">Лента заказов</p>
                            </NavLink>
                        </li>
                    </menu>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="pr-5 pl-5">
                    <NavLink
                        activeClassName={appHeaderStyles.linkActive}
                        className={`${appHeaderStyles.link} text text_type_main-default`}
                        exact
                        to="/profile/orders"
                    >
                        <ProfileIcon type='secondary' />
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;