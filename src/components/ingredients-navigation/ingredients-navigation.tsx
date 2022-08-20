import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import navigationStyles from './ingredients-navigation.module.css';
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { TIngredientsType } from '../../services/types';


interface IIngredientsNavigation
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    tabs: TIngredientsType[],
    current: string,
    handleClick: (type: string) => void
  }

const IngredientsNavigation:FC<IIngredientsNavigation> = ({ tabs, current, handleClick }) => {

    return (
        <nav className={navigationStyles.navigation}>
            {
                tabs.map((item, index) =>
                    <Tab key={index} value={item.type} active={current === item.type} onClick={() => handleClick(item.type)}>{item.name}</Tab>)
            }
        </nav>
    )
}

export default IngredientsNavigation