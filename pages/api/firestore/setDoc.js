import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  const { collectionName, documentId, data } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!collectionName || !documentId || !data) {
    return res.status(400).json({
      error: "Collection name, document ID, and data are required",
    });
  }

  try {
    const firestore = admin.firestore();
    const documentRef = firestore.collection(collectionName).doc(documentId);

    await documentRef.set(data, { merge: true });

    res.status(200).json({ message: "Document successfully set/updated" });
  } catch (error) {
    console.error("Error setting document:", error);
    res.status(500).json({ error: error.message });
  }
}
