export const ingredientTypes = [
  {
    type: 'bun',
    name: 'Булки',
  },
  {
    type: 'sauce',
    name: 'Соусы'
  },
  {
    type: 'main',
    name: 'Начинки'
  }  
];

export const getIngredientsByType = (itemType, ingredientsArr) => {
    console.log(ingredientsArr.filter(el => el.type === itemType));
    return ingredientsArr.filter(el => el.type === itemType);
};