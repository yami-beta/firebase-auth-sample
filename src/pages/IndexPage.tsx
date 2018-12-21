import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "../components/Link";

const IndexPage = () => {
  const { user, history } = useContext(AppContext);

  return (
    <div>
      <h1>Index</h1>
      <p>{user && user.email}</p>
      {!user && (
        <p>
          <Link href="/login" history={history}>
            Login
          </Link>
        </p>
      )}
      {user && (
        <p>
          <Link href="/logout" history={history}>
            Logout
          </Link>
        </p>
      )}
    </div>
  );
};

export { IndexPage };
