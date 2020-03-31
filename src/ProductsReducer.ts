import { Reducer } from "redux";
import {
  IProductsState,
  ProductsActions,
  ProductsActionTypes
} from "./ProductsTypes";

const initialProductState: IProductsState = {
  products: [],
  productsLoading: false
};

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case ProductsActionTypes.LOADING: {
      return {
        ...state,
        products: [],
        productsLoading: true
      };
    }
    case ProductsActionTypes.GETALL: {
      return {
        ...state,
        products: action.products,
        productsLoading: false
      };
    }
  }
  return {
    ...state,
    products: [],
    productsLoading: false
  };
};
