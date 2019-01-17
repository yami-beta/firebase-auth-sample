import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

const Login = ({
  firebaseAuth,
  handleLogin
}: {
  firebaseAuth: firebase.auth.Auth;
  handleLogin: (LoginResult) => void;
}) => {
  const handleClick = async event => {
    event.preventDefault();
    const loginResult = await loginByGoogle(firebaseAuth);
    handleLogin(loginResult);
  };

  return (
    <p>
      <a href="#" onClick={handleClick}>
        Google ログイン
      </a>
    </p>
  );
};

interface LoginResult {
  user?: firebase.User;
  error?: firebase.FirebaseError;
}
const loginByGoogle = (
  firebaseAuth: firebase.auth.Auth
): Promise<LoginResult> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebaseAuth
    .signInWithPopup(provider)
    .then((result: firebase.auth.UserCredential) => {
      // eslint-disable-next-line no-console
      console.log(result);
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      return { user: result.user, error: null };
    })
    .catch((error: firebase.FirebaseError) => {
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

export { Login, LoginResult };
