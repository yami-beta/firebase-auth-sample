import firebase from "firebase";

const initializeFirebase = (config): firebase.app.App => {
  return firebase.initializeApp(config);
};

export { initializeFirebase };
