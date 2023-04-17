import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {store, persistor} from "./store/store";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {Elements} from '@stripe/react-stripe-js';
import {stripePromise} from './utils/stripe/stripe.utils';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
          </BrowserRouter>
        </PersistGate>   
      </Provider>
  </React.StrictMode>,
  rootElement
);
