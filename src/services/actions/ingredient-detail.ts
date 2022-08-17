import { OPEN_DETAIL, CLOSE_DETAIL } from "../constants/ingredient-detail";
import { IIngredient } from "../types";

export interface IOpenDetailAction {
  readonly type: typeof OPEN_DETAIL;
  readonly ingredient: IIngredient;
}

export interface ICloseDetailAction {
  readonly type: typeof CLOSE_DETAIL;
}

export type TDetailActions = IOpenDetailAction | ICloseDetailAction;

export const setPickedIngredient = (item: IIngredient): IOpenDetailAction => ({
  type: OPEN_DETAIL,
  ingredient: item,
});

export const closeDetailModal = (): ICloseDetailAction => ({
  type: CLOSE_DETAIL,
});
