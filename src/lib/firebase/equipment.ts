import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEBcpn1WV35bnVf8-5z5jvXQu1Y47G3ho",
  authDomain: "inventorymanagement-f7db4.firebaseapp.com",
  projectId: "inventorymanagement-f7db4",
  storageBucket: "inventorymanagement-f7db4.firebasestorage.app",
  messagingSenderId: "858516922988",
  appId: "1:858516922988:web:6a143e7608ca225700ee49",
  measurementId: "G-046FERBD46",
};
  
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);