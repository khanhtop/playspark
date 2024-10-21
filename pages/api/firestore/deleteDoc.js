import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  const { collectionName, documentId } = req.body; // Expecting collection name and document ID in the request body

  if (req.method !== "DELETE") {
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

    // Delete the document
    await documentRef.delete();

    // Respond with a success message
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: error.message });
  }
}
