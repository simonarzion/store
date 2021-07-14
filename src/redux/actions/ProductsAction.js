import ActionTypes from "../constants/ActionTypes";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setSelectedProduct = (product) => {
  return {
    type: ActionTypes.SELECT_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const filterCategory = (products) => {
  return {
    type: ActionTypes.FILTER_CATEGORY,
    payload: products,
  };
};

export const sortProducts = (products) => {
  return {
    type: ActionTypes.SORT_PRODUCTS,
    payload: products,
  };
};
