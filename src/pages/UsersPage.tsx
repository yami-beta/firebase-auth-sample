import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AppContext } from "../App";

const UsersPage = () => {
  const {
    user,
    firestore
  }: {
    user: firebase.User | null;
    firestore: firebase.firestore.Firestore;
  } = useContext(AppContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers(firestore);
      setUsers(users);
    })();
  }, []);

  return (
    <div>
      <h1>UsersPage</h1>
      {user && <p>{user.email}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.id}</p>
            <ul>
              <li>uid: {user.data.uid}</li>
              <li>role: {user.data.role}</li>
            </ul>
          </li>
        ))}
      </ul>
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
  return querySnapshot.docs.map(user => ({
    id: user.id,
    data: user.data()
  }));
};

export { UsersPage };
