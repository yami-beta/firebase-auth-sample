import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { History } from "history";
import { Link } from "./Link";

const Logout = ({
  firebaseAuth,
  history
}: {
  firebaseAuth: firebase.auth.Auth;
  history: History;
}) => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    // useEffect()の引数をasync関数にすると型エラーになるため
    (async () => {
      const result = await logoutGoogle(firebaseAuth);
      if (result.error) {
        // eslint-disable-next-line no-console
        console.log(result.error);
        return;
      }

      setDone(true);
    })();
  }, []);

  return (
    <div>
      {done ? (
        <p>
          ログアウトしました
          <br />
          <Link href="/" history={history}>
            トップへ戻る
          </Link>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const logoutGoogle = (auth): Promise<{ error?: Error }> => {
  return auth
    .signOut()
    .then(() => {
      return { error: null };
    })
    .catch(error => {
      return { error };
    });
};

export { Logout };
