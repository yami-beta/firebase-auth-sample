import * as firebaseTesting from "@firebase/testing";
import firebase from "firebase";
import fs from "fs";
import path from "path";

const getTestApp = (
  projectId: string,
  auth = { uid: "user", email: "user@example.com" }
): firebase.app.App => {
  return firebaseTesting.initializeTestApp({
    projectId,
    auth
  });
};

describe("firestore.rules", () => {
  const rules = fs.readFileSync(
    path.join(__dirname, "..", "firestore.rules"),
    "utf8"
  );

  afterAll(() => {
    return Promise.all(firebaseTesting.apps().map(app => app.delete()));
  });

  describe("/invalid", () => {
    const projectId = `test-invalid-collection-${Date.now()}`;
    const firestore = getTestApp(projectId).firestore();
    firebaseTesting.loadFirestoreRules({ projectId, rules });

    test("it should not write", async () => {
      await expect(
        firestore
          .collection("invalid")
          .doc()
          .set({ foo: "bar" })
      ).rejects.toThrow();
    });
  });

  describe("/users", () => {
    const projectId = `test-users-collection-${Date.now()}`;
    const firestore = getTestApp(projectId).firestore();
    firebaseTesting.loadFirestoreRules({ projectId, rules });

    test("it should write when user's uid === /users/{uid}", async () => {
      await expect(
        firestore
          .collection("users")
          .doc("user")
          .set({ role: "operator" })
      ).resolves.toBeUndefined();
    });

    test("it should not write when user's uid !== /users/{uid}", async () => {
      await expect(
        firestore
          .collection("users")
          .doc("foobar")
          .set({ role: "operator" })
      ).rejects.toThrow();
    });

    test("it should return users when user's operator is 'admin'", async () => {
      await expect(
        firestore
          .collection("users")
          .doc("user")
          .set({ role: "admin" })
      ).resolves.toBeUndefined();

      const otherFirestore = firebaseTesting
        .initializeAdminApp({ projectId })
        .firestore();
      await expect(
        otherFirestore
          .collection("users")
          .doc("other")
          .set({ role: "operator" })
      ).resolves.toBeUndefined();

      const usersQuerySnapshot = await firestore.collection("users").get();
      expect(usersQuerySnapshot.docs.length).toBe(2);
    });
  });
});
