import React, { useContext } from "react";
import { AppContext } from "../App";
import { Logout } from "../components/Logout";

const LogoutPage = () => {
  const { firebaseAuth, history } = useContext(AppContext);

  return (
    <div>
      <h1>Logout</h1>
      <Logout firebaseAuth={firebaseAuth} history={history} />
    </div>
  );
};

export { LogoutPage };
