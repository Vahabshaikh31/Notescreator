// src/Auth0ProviderWithHistory.jsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-abwbbaioh68ba27m.us.auth0.com";
  const clientId = "EHG8LsBQ0gkwZkm1UJgWxKJgxjfzRJAe";
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
      audience="txWAs3VMGgDy7OvOjw56_JwXAwF3mfflY7OvlpZaErXXfUP1AbsKbhGnODGpt5MD+"
      scope="openid profile email"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
