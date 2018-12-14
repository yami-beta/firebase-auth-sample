import firebase from "firebase";

function initializeFirebase(config): firebase.app.App {
  return firebase.initializeApp(config);
}

export { initializeFirebase };
