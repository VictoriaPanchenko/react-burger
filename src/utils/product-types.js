import PropTypes from 'prop-types';

export const categories = [
  {
    id: 'type1',
    type: 'bun',
    name: 'Булки',
  },
  {
    id: 'type2',
    type: 'sauce',
    name: 'Соусы'
  },
  {
    id: 'type3',
    type: 'main',
    name: 'Начинки'
  }  
];

export const getIngredientsByType = (itemType, ingredientsArr) => {
    return ingredientsArr.filter(el => el.type === itemType);
};

export const categoryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
});

