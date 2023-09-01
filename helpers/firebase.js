// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHPeDzT6FtFTAE89X1ieH3DfdxXxoO1HA",
  authDomain: "playspark-c6ad4.firebaseapp.com",
  projectId: "playspark-c6ad4",
  storageBucket: "playspark-c6ad4.appspot.com",
  messagingSenderId: "323993395719",
  appId: "1:323993395719:web:cce5dbcd57b3f6a4e7c0a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export methods
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const logout = () => {
  signOut(auth);
  window.location.href = "/";
};
