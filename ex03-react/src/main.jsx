import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="marciobueno1.auth0.com"
      clientId="IhFWWHBvCDIox27Def0vjSt74lhCM9dj"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      audience="https://aosexpress20242-23o7ept3.b4a.run/"
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
