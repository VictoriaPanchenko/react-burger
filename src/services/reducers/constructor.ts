import update from "immutability-helper";
import { TConstructorActions } from "../actions/constructor";
import {
  ADD,
  DELETE,
  CHANGE_ORDER,
  CLEAR_CONSTRUCTOR,
} from "../constants/constructor";
import { IIngredient } from "../types";

type TConstructorState = {
  bun: IIngredient | null;
  fixings: ReadonlyArray<IIngredient>;
  productsIds: string[];
  totalPrice: number;
};

const initialState: TConstructorState = {
  bun: null,
  fixings: [],
  productsIds: [],
  totalPrice: 0,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case ADD:
      if (action.item.type === "bun") {
        if (state.bun != null) {
          return {
            ...state,
            bun: action.item,
            productsIds: state.productsIds
              .filter((id) => id !== state.bun?._id)
              .concat(action.item._id),
            totalPrice:
              state.totalPrice - state.bun.price * 2 + action.item.price * 2,
          };
        } else {
          return {
            ...state,
            bun: action.item,
            productsIds: [...state.productsIds, action.item._id],
            totalPrice: state.totalPrice + action.item.price * 2,
          };
        }
      }

      //fixings
      return {
        ...state,
        fixings: [...state.fixings, action.item],
        productsIds: [...state.productsIds, action.item._id],
        totalPrice: state.totalPrice + action.item.price,
      };

    case DELETE:
      return {
        ...state,
        fixings: [...state.fixings].filter(
          (item) => item.uId !== action.item.uId
        ),
        productsIds: [...state.productsIds].filter(
          (id) => id !== action.item._id
        ),
        totalPrice: state.totalPrice - action.item.price,
      };

    case CHANGE_ORDER:
      return {
        ...state,
        fixings: update(state.fixings, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.fixings[action.dragIndex]],
          ],
        }),
      };

    case CLEAR_CONSTRUCTOR:
      return initialState;

    default:
      return state;
  }
};
