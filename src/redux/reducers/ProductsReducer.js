import ActionTypes from "../constants/ActionTypes";

const initialState = {
  products: [],
};

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const SelectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_PRODUCT:
      return { ...state, product: action.payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const FilterCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FILTER_CATEGORY:
      return { ...state, products: action.payload };
    case ActionTypes.SORT_PRODUCTS:
      return { products: action.payload };
    default:
      return state;
  }
};
