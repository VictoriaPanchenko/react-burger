import React, { FC, DetailedHTMLProps, HTMLAttributes, } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const AppHeader: FC<IHeader> = () => {

    const { user } = useAppSelector(store => store.user);


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
                                to="/feed"
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
                        to="/profile"
                    >
                        <ProfileIcon type='secondary' />
                        <p className="text text_type_main-default ml-2">{user ? user.name : 'Личный кабинет'}</p>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;