import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${appHeaderStyles.header} pt-4 pb-4`} >
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.wrapper}>
                    <menu className={appHeaderStyles.menuList}>
                        <li className="pr-5 pl-5">
                            <a href="#"  className={appHeaderStyles.linkActive}>
                                <BurgerIcon type="primary"/>
                                <p className="text text_type_main-default ml-2">Конструктор</p>
                            </a>
                        </li>
                        <li className="pr-5 pl-5 ml-2">
                            <a href="#" className={appHeaderStyles.link}>
                                <ListIcon type='secondary'/>
                                <p className="text text_type_main-default ml-2">Лента заказов</p>
                            </a>
                        </li>
                    </menu>
                    <Logo/>                    
                </div>
                <div className="pr-5 pl-5">
                    <a href="#" className={appHeaderStyles.link}>
                        <ProfileIcon type='secondary'/>
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </a>
                </div>
            </nav>            
        </header>
    );
}

export default AppHeader;