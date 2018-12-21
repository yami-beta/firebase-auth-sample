import React, { useContext } from "react";
import { AppContext } from "../App";
import { Login } from "../components/Login";

const LoginPage = () => {
  const { firebaseAuth, history } = useContext(AppContext);

  return (
    <div>
      <h1>Login</h1>
      <Login firebaseAuth={firebaseAuth} history={history} />
    </div>
  );
};

export { LoginPage };
