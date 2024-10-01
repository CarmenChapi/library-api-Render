import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const serviceAccount = require("../permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

export { db };
