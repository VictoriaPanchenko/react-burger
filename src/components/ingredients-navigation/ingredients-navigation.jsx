import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import navigationStyles from './ingredients-navigation.module.css';
import { categoryPropType } from '../../utils/product-types';

const IngredientsNavigation = ( {tabs} ) => {
    const [current, setCurrent] = useState(tabs[0].id);    

    const scrollToPickedCategory = () => {
        document.getElementById(current).scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToPickedCategory, [current]);

    return (
        <nav className={navigationStyles.navigation}>
            {
                tabs.map((item, index) => 
                <Tab key={index} value={item.id} active={current === item.id} onClick={setCurrent}>{item.name}</Tab> )
            }
        </nav>
    )
}

IngredientsNavigation.propTypes = {
    tabs: PropTypes.arrayOf(categoryPropType.isRequired).isRequired
}

export default IngredientsNavigation