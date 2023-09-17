import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './Context/productContext';
import {FilterProvider} from "./Context/filterContext";
import { CartProvider } from './Context/cartContext';
import { Auth0Provider } from '@auth0/auth0-react';
import env from "react-dotenv";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <FilterProvider>
      <CartProvider>
        <App />
    </CartProvider>
    </FilterProvider>
    </AppProvider>
);




reportWebVitals();
