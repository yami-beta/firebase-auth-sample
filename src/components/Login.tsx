import React from "react";
import firebase from "firebase";

function loginByGoogle(
  firebaseAuth: firebase.auth.Auth
): Promise<{ user: firebase.User; err: Error }> {
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
      return { user: result.user, err: null };
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
      return { user: null, err: error };
    });
}

function Login({ firebaseAuth }: { firebaseAuth: firebase.auth.Auth }) {
  const handleClick = async event => {
    event.preventDefault();
    const loginResult = await loginByGoogle(firebaseAuth);
    if (loginResult.err) {
      // eslint-disable-next-line no-console
      console.log(loginResult.err);
      return;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>
        <a href="#" onClick={handleClick}>
          Google ログイン
        </a>
      </p>
    </div>
  );
}

export { Login };
