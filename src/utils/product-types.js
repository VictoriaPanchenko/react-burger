import PropTypes from 'prop-types';

export const categories = {
  Bun: {
    id: 'type1',
    type: 'bun',
    name: 'Булки',
  },
  Sauce: {
    id: 'type2',
    type: 'sauce',
    name: 'Соусы'
  },
  Main: {
    id: 'type3',
    type: 'main',
    name: 'Начинки'
  }  
};

export const categoryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
});

