import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { History } from "history";

const Login = ({
  firebaseAuth,
  history
}: {
  firebaseAuth: firebase.auth.Auth;
  history: History;
}) => {
  const handleClick = async event => {
    event.preventDefault();
    const loginResult = await loginByGoogle(firebaseAuth);
    if (loginResult.error) {
      // eslint-disable-next-line no-console
      console.log(loginResult.error);
      return;
    }

    history.push("/");
  };

  return (
    <p>
      <a href="#" onClick={handleClick}>
        Google ログイン
      </a>
    </p>
  );
};

const loginByGoogle = (
  firebaseAuth: firebase.auth.Auth
): Promise<{ user?: firebase.User; error?: Error }> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebaseAuth
    .signInWithPopup(provider)
    .then(result => {
      // eslint-disable-next-line no-console
      console.log(result);
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      return { user: result.user, error: null };
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      return { user: null, error: error };
    });
};

export { Login };
