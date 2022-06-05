export const ADD = 'ADD';
export const DELETE = 'DELETE';


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