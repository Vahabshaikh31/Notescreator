import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const App = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState(null);

  const callApi = () => {
    axios
      .get("http://localhost:3000/")
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const ProtecedcallApi = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      console.log("Token:", accessToken);
      const response = await axios.get("http://localhost:3000/protected", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Please log in</h2>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      )}
      <button onClick={callApi}>Call Public API Route</button>
      <button onClick={ProtecedcallApi}>Call Protected API Route</button>
    </div>
  );
};

export default App;
