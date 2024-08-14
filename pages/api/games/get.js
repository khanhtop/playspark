import { firestore } from "@/helpers/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, apikey"
    );
    res.status(200).end();
    return;
  }
  if (req.method === "GET") {
    // Return an empty array
    const userSnapshot = await getDocs(
      query(
        collection(firestore, "users"),
        where("sportzfanSlug", "==", req.headers.apikey)
      )
    );
    if (userSnapshot.empty) {
      res.status(200).json([]);
    } else {
      let uid = undefined;
      userSnapshot.forEach((doc) => {
        uid = doc.id;
      });
      if (!uid) {
        res.status(200).json([]);
      } else {
        const gamesSnapshot = await getDocs(
          query(
            collection(firestore, "tournaments"),
            where("ownerId", "==", uid),
            where("isActive", "==", true)
          )
        );

        if (gamesSnapshot.empty) {
          res.status(200).json([]);
        } else {
          let out = [];
          gamesSnapshot.forEach((doc) => {
            out.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          res.status(200).json(out);
        }
      }
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
