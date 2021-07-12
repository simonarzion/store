import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import GlobalStyle from "./globalStyles";
import { rootReducer } from "./redux/store";
import CartPage from "./screens/CartPage";
import HomePage from "./screens/HomePage";
import NotFoundPage from "./screens/NotFoundPage";
import ProductPage from "./screens/ProductPage";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
