import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDktl6Vropk7OS4WIjGuGCZ-aAPQccyTtQ",
    authDomain: "basic-commerce-2627.firebaseapp.com",
    projectId: "basic-commerce-2627",
    storageBucket: "basic-commerce-2627.appspot.com",
    messagingSenderId: "493477090956",
    appId: "1:493477090956:web:8ac7b1f99cd7b840a14da9"
  };

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

export { provider, auth };
export default db;
