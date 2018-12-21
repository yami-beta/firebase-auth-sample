import React from "react";
import firebase from "firebase";

function Logout() {
  const handleClick = async event => {
    event.preventDefault();
    await logoutGoogle();
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>
        <a href="#" onClick={handleClick}>
          ログアウト
        </a>
      </p>
    </div>
  );
}

function logoutGoogle() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("logout");
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

export { Logout };
