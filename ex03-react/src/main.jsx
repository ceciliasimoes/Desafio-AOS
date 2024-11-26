import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App.jsx";

const domain = "dev-eczmj30g2g1e86b7.us.auth0.com"
const clientId="JX8ryXs1T6fMAjsPHQTbiSWovI2S6NUV"
const  audience="https://desafio-aos.onrender.com"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      audience={audience}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
