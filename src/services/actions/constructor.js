import { v4 as uuidv4 } from 'uuid';

export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export function addItem(item) {
 
  return {
    type: ADD,
    item: {
      ...item,
      uId: uuidv4()
    }
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

export function clearConstructor() {
  return {
    type: CLEAR,
  };
}