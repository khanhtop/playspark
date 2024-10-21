import { initializeApp } from "firebase/app";

export default function handler(req, res) {
  const firebaseConfig = {
    apiKey: "AIzaSyDHPeDzT6FtFTAE89X1ieH3DfdxXxoO1HA",
    authDomain: "playspark-c6ad4.firebaseapp.com",
    projectId: "playspark-c6ad4",
    storageBucket: "playspark-c6ad4.appspot.com",
    messagingSenderId: "323993395719",
    appId: "1:323993395719:web:cce5dbcd57b3f6a4e7c0a2",
  };
  const app = initializeApp(firebaseConfig);

  // Return the appId
  res.status(200).json({ app: app });
}
