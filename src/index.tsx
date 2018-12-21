import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { App } from "./App";
import { initializeFirebase } from "./firebase";

const firebaseApp = initializeFirebase({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
});

const history = createBrowserHistory();
render(
  <App firebaseApp={firebaseApp} history={history} />,
  document.getElementById("root")
);
