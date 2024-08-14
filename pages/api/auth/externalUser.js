import { auth, firestore } from "@/helpers/firebase";
import { generateProfile } from "@/helpers/profileGen";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export default async function handler(req, res) {
  const { email, name } = req.body;
  let password = null;
  let previousName = null;
  // Check whether a user document exists
  if (email) {
    const snapshot = await getDocs(
      query(collection(firestore, "users"), where("email", "==", email))
    );
    const pwd = snapshot.docs[0]?.data()?.pwd;
    previousName = snapshot.docs[0]?.data()?.companyName;
    if (pwd) {
      password = pwd;
    } else {
      password = Math.random().toString(36).substring(2, 14);
    }
  }

  // Try and sign in
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential?.user?.uid) {
      if (name && name !== previousName) {
        await setDoc(
          doc(firestore, "users", userCredential?.user?.uid),
          {
            companyName: name,
          },
          { merge: true }
        );
      }
      return res.send({ email: email, password: password });
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      const avatarResponse = await fetch(
        "https://api.reimage.dev/get/tags?avatar",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
          },
        }
      );
      const avatars = await avatarResponse.json();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const username = generateProfile();
        const user = userCredential.user;
        const uid = user.uid;
        await setDoc(
          doc(firestore, "users", uid),
          {
            companyName: name || username,
            email: email,
            pwd: password,
            profilePhoto:
              avatars.thumbnails[
                Math.floor(Math.random() * avatars.thumbnails.length)
              ],
          },
          { merge: true }
        );
        return res.send({ email: email, password: password });
      } catch (error) {
        return res.send({ email: null, password: null });
      }
    }
  }
}
