export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const CHANGE_ORDER = 'CHANGE_ORDER';


export function addItem(item) {
  return {
    type: ADD,
    item,
  };
}

export function removeItem(item) {
  return {
    type: DELETE,
    item,
  };
}

export function changeOrder(dragIndex, hoverIndex) {
  return {
    type: CHANGE_ORDER,
    dragIndex,
    hoverIndex
  };
}