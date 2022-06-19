import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import navigationStyles from './ingredients-navigation.module.css';

const IngredientsNavigation = ({ tabs, current, handleClick }) => {

    return (
        <nav className={navigationStyles.navigation}>
            {
                tabs.map((item, index) =>
                    <Tab key={index} value={item.type} active={current === item.type} onClick={() => handleClick(item.type)}>{item.name}</Tab>)
            }
        </nav>
    )
}

IngredientsNavigation.propTypes = {
    tabs: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default IngredientsNavigation