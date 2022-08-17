import { IIngredient,IOrder, IWsOrder } from ".";

export interface IIngredientResponse {
    data: IIngredient[];
    success: boolean;
  }

  export interface INewOrderResponse {
    name: string;
    success: boolean;
    order: IOrder;
  }

  export interface IWsResponse {
    orders: IWsOrder[];
    success: boolean;
    total: number;
    totalToday: number;
  }

  export interface IUser {
    email: string;
    name: string;
  }

  export interface IUserResponse {
    success: boolean;
    user: IUser;
  }