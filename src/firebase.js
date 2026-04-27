import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7GdRbXGhjU6R-UhRj7u0_RAzWXXJnLoU",
  authDomain: "wedding-invitation-5be3c.firebaseapp.com",
  projectId: "wedding-invitation-5be3c",
  storageBucket: "wedding-invitation-5be3c.firebasestorage.app",
  messagingSenderId: "812672489544",
  appId: "1:812672489544:web:7361db398da6f5e4d6e07d",
  measurementId: "G-Q5B9M0N8ZP"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
