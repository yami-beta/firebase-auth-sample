import React, { useState, useEffect, useMemo, createContext } from "react";
import UniversalRouter from "universal-router";
import firebase from "firebase/app";
import "firebase/auth";
import { History } from "history";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";

const routes = [
  {
    path: "",
    action: (context: any) => {
      return { content: IndexPage };
    }
  },
  {
    path: "/login",
    action: (context: any) => {
      return { content: LoginPage };
    }
  },
  {
    path: "/logout",
    action: (context: any) => {
      return { content: LogoutPage };
    }
  }
];

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

  useEffect(() => {
    authHandler(setUser);
    return () => {
      setUser(null);
    };
  }, []);

  const appState = {
    user,
    firebaseAuth: firebaseApp.auth(),
    history
  };
  return (
    <AppContext.Provider value={appState}>
      <Component />
    </AppContext.Provider>
  );
};

const useRouter = (routes, history: History) => {
  const [location, setLocation] = useState(history.location);
  const [Component, setComponent]: [any, any] = useState(() => () => "");
  const router = useMemo(() => new UniversalRouter(routes), [routes]);

  useEffect(
    () => {
      router.resolve(location.pathname).then(route => {
        if (route.redirect) {
          history.replace(route.redirect);
          return;
        }
        setComponent(() => route.content);
      });
      const unlisten = history.listen(location => setLocation(location));
      return () => unlisten();
    },
    [history, location]
  );

  return Component;
};

const authHandler = setUser => {
  firebase.auth().onAuthStateChanged((user: firebase.User) => {
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      // No user is signed in.
      setUser(null);
    }
  });
};

export { App, AppContext };
