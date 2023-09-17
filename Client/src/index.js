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
<<<<<<< HEAD
=======
  <Auth0Provider
    domain={window.env.REACT_APP_DOMAIN}
    clientId={window.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: "https://main--extraordinary-torrone-93f172.netlify.app"
    }}>
>>>>>>> 2d35b18d4d0584e865862319e59392b3062abcc1
  <AppProvider>
    <FilterProvider>
      <CartProvider>
        <App />
    </CartProvider>
    </FilterProvider>
    </AppProvider>
);




reportWebVitals();
