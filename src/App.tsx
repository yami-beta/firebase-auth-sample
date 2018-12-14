import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";

function App({ firebaseApp }: { firebaseApp: firebase.app.App }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authHandler(setUser);
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <div>
      {!user ? <Login firebaseAuth={firebaseApp.auth()} /> : <Logout />}
    </div>
  );
}

function authHandler(setUser) {
  firebase.auth().onAuthStateChanged((user: firebase.User) => {
    console.log(user);
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      // No user is signed in.
      setUser(null);
    }
  });
}

export { App };
