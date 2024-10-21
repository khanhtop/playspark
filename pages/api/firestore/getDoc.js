import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  const { collectionName, documentId } = req.body; // No data needed for getDoc

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!collectionName || !documentId) {
    return res.status(400).json({
      error: "Collection name and document ID are required",
    });
  }

  try {
    const firestore = admin.firestore();
    const documentRef = firestore.collection(collectionName).doc(documentId);

    // Get the document
    const doc = await documentRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Return the document data along with the document ID
    res.status(200).json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ error: error.message });
  }
}
