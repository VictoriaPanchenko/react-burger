import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsNavigation = ( {tabs} ) => {
    const [current, setCurrent] = useState(tabs[0]);

    return (
        <nav style={{ display: 'flex' }}>
            {
                tabs.map((item, index) => 
                <Tab key={index} value={item} active={current === item} onClick={setCurrent}>{item}</Tab> )
            }
        </nav>
    )
}

IngredientsNavigation.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default IngredientsNavigation