import React, { useContext, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { AppContext } from "../App";
import { Login, LoginResult } from "../components/Login";

const LoginPage = () => {
  const { firebaseAuth, history, firestore } = useContext(AppContext);

  const handleLogin = useCallback(async (loginResult: LoginResult) => {
    if (loginResult.error) {
      // eslint-disable-next-line no-console
      console.log(loginResult.error);
      return;
    }

    const done = await setUserToFirestore(firestore, loginResult.user);
    if (done) {
      history.push("/");
    } else {
      // eslint-disable-next-line no-console
      console.log("Failed to set user to Firestore");
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <Login firebaseAuth={firebaseAuth} handleLogin={handleLogin} />
    </div>
  );
};

const setUserToFirestore = async (
  firestore: firebase.firestore.Firestore,
  user: firebase.User
): Promise<boolean> => {
  const userDoc = firestore.collection("users").doc(user.uid);
  const userDocSnapshot = await userDoc.get();
  let updateFields: any = {
    email: user.email,
    lastLoginTimestamp: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (!userDocSnapshot.exists) {
    updateFields.role = "operator";
  }

  return await userDoc
    .set(updateFields, { merge: true })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export { LoginPage };
