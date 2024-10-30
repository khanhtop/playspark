import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  // Handle OPTIONS method for CORS preflight request
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, apikey"
    );
    res.status(200).end();
    return;
  }

  // Handle GET method
  if (req.method === "GET") {
    try {
      const firestore = admin.firestore();

      // Query to find the user by 'sportzfanSlug' from the 'users' collection
      const userSnapshot = await firestore
        .collection("users")
        .where("sportzfanSlug", "==", req.headers.apikey)
        .get();

      if (userSnapshot.empty) {
        return res.status(200).json([]);
      }

      // Extract the user ID
      let uid;
      userSnapshot.forEach((doc) => {
        uid = doc.id;
      });

      if (!uid) {
        return res.status(200).json([]);
      }

      // Query to find active tournaments by the user ID in the 'tournaments' collection
      const gamesSnapshot = await firestore
        .collection("tournaments")
        .where("ownerId", "==", uid)
        .where("isActive", "==", true)
        .get();

      if (gamesSnapshot.empty) {
        return res.status(200).json([]);
      }

      // Build the output array with the tournament data
      const out = [];
      gamesSnapshot.forEach((doc) => {
        out.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return res.status(200).json(out);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Handle unsupported methods
  else {
    res.setHeader("Allow", ["GET", "OPTIONS"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
