import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  const { collectionName, data } = req.body; // No documentId needed, as Firestore auto-generates it

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!collectionName || !data) {
    return res.status(400).json({
      error: "Collection name and data are required",
    });
  }

  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection(collectionName);

    // Add a new document and let Firestore generate the ID
    const newDocRef = await collectionRef.add(data);

    res.status(200).json({
      message: "Document successfully added",
      documentId: newDocRef.id, // Return the new document ID
    });
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).json({ error: error.message });
  }
}
