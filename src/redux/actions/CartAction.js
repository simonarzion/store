import ActionTypes from "../constants/ActionTypes";

export const addToCart = (product) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: product,
  };
};

export const deleteFromCart = (product) => {
  return {
    type: ActionTypes.DELETE_FROM_CART,
    payload: product,
  };
};
