import admin from "@/helpers/firebaseAdmin";
import { generateProfile } from "@/helpers/profileGen";

export default async function handler(req, res) {
  const { email, name } = req.body;
  let password = null;
  let previousName = null;

  const firestore = admin.firestore();
  const auth = admin.auth();

  // Check if a user document exists by querying the Firestore "users" collection
  if (email) {
    const snapshot = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    const userData = snapshot.docs[0]?.data();
    previousName = userData?.companyName;
    password = userData?.pwd || Math.random().toString(36).substring(2, 14);
  }

  try {
    // Attempt to sign in with the existing user credentials via Admin SDK
    const userRecord = await auth.getUserByEmail(email);

    if (userRecord && userRecord.uid) {
      if (name && name !== previousName) {
        await firestore
          .collection("users")
          .doc(userRecord.uid)
          .set({ companyName: name }, { merge: true });
      }
      return res.send({ email, password });
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      // If user is not found, create a new user
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
        // Create the new user with the generated password
        const userRecord = await auth.createUser({
          email,
          password,
        });

        const username = generateProfile();
        const uid = userRecord.uid;

        // Save user data in Firestore
        await firestore
          .collection("users")
          .doc(uid)
          .set(
            {
              companyName: name || username,
              email,
              pwd: password,
              profilePhoto:
                avatars.thumbnails[
                  Math.floor(Math.random() * avatars.thumbnails.length)
                ],
            },
            { merge: true }
          );

        return res.send({ email, password });
      } catch (error) {
        return res.send({ email: null, password: null });
      }
    } else {
      console.error("Error during user lookup or creation:", error);
      return res.status(500).send({ email: null, password: null });
    }
  }
}
