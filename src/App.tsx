import React, { useState, useEffect, useMemo, createContext } from "react";
import UniversalRouter from "universal-router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { History } from "history";
import { routes } from "./routes";

const AppContext = createContext(null);
const App = ({
  firebaseApp,
  history
}: {
  firebaseApp: firebase.app.App;
  history: History;
}) => {
  const [user, setUser] = useState(null);
  const Component = useRouter(routes, history);

  const firebaseAuth = firebaseApp.auth();
  const firestore = firebaseApp.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  useFirebaseAuth({ firebaseAuth, setUser });

  const appState: AppState = {
    user,
    firebaseAuth,
    firestore: firebaseApp.firestore(),
    history
  };

  return (
    <AppContext.Provider value={appState}>
      <Component />
    </AppContext.Provider>
  );
};

interface AppState {
  user: firebase.auth.Auth | null;
  firebaseAuth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  history: History;
}

const useRouter = (routes, history: History) => {
  const [location, setLocation] = useState(history.location);
  const [Component, setComponent]: [any, any] = useState(() => () => "");
  const router = useMemo(() => new UniversalRouter(routes), [routes]);

  useEffect(
    () => {
      const unlisten = history.listen(location => setLocation(location));
      return () => unlisten();
    },
    [history]
  );

  useEffect(
    () => {
      router.resolve(location.pathname).then(route => {
        if (route.redirect) {
          history.replace(route.redirect);
          return;
        }
        setComponent(() => route.content);
      });
    },
    [location]
  );

  return Component;
};

const useFirebaseAuth = ({
  firebaseAuth,
  setUser
}: {
  firebaseAuth: firebase.auth.Auth;
  setUser: any;
}) => {
  useEffect(
    () => {
      firebaseAuth.onAuthStateChanged((user: firebase.User) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => {
        setUser(null);
      };
    },
    [firebaseAuth]
  );
};

export { App, AppContext, AppState };
