import ActionTypes from "../constants/ActionTypes";

const initialState = [];

export const CartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return [...state, action.payload];
    case ActionTypes.DELETE_FROM_CART:
      return [...action.payload];
    default:
      return state;
  }
};
