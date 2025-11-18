import { initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import fs from "fs";

const serviceAccount: ServiceAccount = JSON.parse(
  fs.readFileSync("todoServiceAccount.json").toString()
);

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db: Firestore = getFirestore();
