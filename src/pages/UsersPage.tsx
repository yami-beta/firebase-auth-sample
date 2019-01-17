import React, { Fragment, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { History } from "history";
import { AppContext } from "../App";

const UsersPage = () => {
  const {
    user,
    history,
    firestore
  }: {
    user: firebase.User | null;
    history: History;
    firestore: firebase.firestore.Firestore;
  } = useContext(AppContext);

  useEffect(
    () => {
      if (!user) {
        history.replace("/");
        return;
      }
    },
    [user, history]
  );

  const [users, setUsers] = useState([]);

  useEffect(
    () => {
      if (!user) {
        return;
      }
      (async () => {
        const users = await getUsers(firestore);
        setUsers(users);
      })();
    },
    [user, firestore]
  );

  return (
    <div>
      {user && (
        <Fragment>
          <h1>UsersPage</h1>
          {user && <p>{user.email}</p>}
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <p>{user.id}</p>
                <ul>
                  <li>email: {user.data.email}</li>
                  <li>role: {user.data.role}</li>
                  <li>lastLoginTimestamp: {user.data.lastLoginTimestamp}</li>
                </ul>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

interface FirestoreDocumentUser {
  id: string;
  data: firebase.firestore.DocumentData;
}

const getUsers = async (
  db: firebase.firestore.Firestore
): Promise<FirestoreDocumentUser[]> => {
  const querySnapshot = await db.collection("users").get();
  return querySnapshot.docs.map(user => {
    const data = user.data();
    const loginDate: Date = data.lastLoginTimestamp.toDate();
    return {
      id: user.id,
      data: {
        ...data,
        lastLoginTimestamp: `${loginDate.toISOString()}`
      }
    };
  });
};

export { UsersPage };
