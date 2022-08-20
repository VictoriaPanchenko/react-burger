import {
  ADD,
  DELETE,
  CHANGE_ORDER,
  CLEAR_CONSTRUCTOR,
} from "../constants/constructor";
import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../types";

export interface IAddToConstructorAction {
  readonly type: typeof ADD;
  readonly item: IIngredient;
}

export interface IDeleteConstructorAction {
  readonly type: typeof DELETE;
  readonly item: IIngredient;
}

export interface IChangeOrderInConstructorAction {
  readonly type: typeof CHANGE_ORDER;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddToConstructorAction
  | IDeleteConstructorAction
  | IChangeOrderInConstructorAction
  | IClearConstructorAction;

export const addItem = (item: IIngredient): IAddToConstructorAction => ({
  type: ADD,
  item: { ...item, uId: uuidv4() },
});

export const removeItem = (item: IIngredient): IDeleteConstructorAction => ({
  type: DELETE,
  item,
});

export const clearConstructor = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});

export const changeOrder = (
  dragIndex: number,
  hoverIndex: number
): IChangeOrderInConstructorAction => ({
  type: CHANGE_ORDER,
  dragIndex,
  hoverIndex,
});
