import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./contexts/user.context";
import {CategoriesProvider} from "./contexts/categories.context";
import {CartProvider} from "./contexts/cart.context";
import {store} from "./store/store";
import {Provider} from "react-redux";

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              {/*<UserProvider>*/}
                  <CategoriesProvider>
                      <CartProvider>
                          <App />
                      </CartProvider>
                  </CategoriesProvider>
              {/*</UserProvider>*/}
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  rootElement
);
