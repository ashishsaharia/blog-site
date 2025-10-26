import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';
import './styles/components.css';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider
	 domain="dev-7fe5aooumszlriaj.us.auth0.com"
    clientId="CnPD3eX5g3GVvFH6iSUxvfQXGumCFBvs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}

	>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Auth0Provider>
);

