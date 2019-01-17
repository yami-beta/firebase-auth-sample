import React, { useContext, useCallback } from "react";
import { AppContext } from "../App";
import { Login, LoginResult } from "../components/Login";

const LoginPage = () => {
  const { firebaseAuth, history } = useContext(AppContext);

  const handleLogin = useCallback((loginResult: LoginResult) => {
    if (loginResult.error) {
      // eslint-disable-next-line no-console
      console.log(loginResult.error);
      return;
    }

    history.push("/");
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <Login firebaseAuth={firebaseAuth} handleLogin={handleLogin} />
    </div>
  );
};

export { LoginPage };
