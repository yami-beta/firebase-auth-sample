import firebase from "firebase/app";

const initializeFirebase = (config): firebase.app.App => {
  return firebase.initializeApp(config);
};

export { initializeFirebase };
