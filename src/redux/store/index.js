import { combineReducers } from "redux";
import { CartReducers } from "../reducers/CartReducers";
import { FilterCategoryReducer, ProductsReducer, SelectedProductReducer } from "../reducers/ProductsReducer";

export const rootReducer = combineReducers({
  products: ProductsReducer,
  product: SelectedProductReducer,
  cart: CartReducers,
  productsFiltered: FilterCategoryReducer,
});
