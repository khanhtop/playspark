import admin from "@/helpers/firebaseAdmin";

export default async function handler(req, res) {
  const { collectionName } = req.body; // Get parameters from request body

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Only allow POST requests
  }

  if (!collectionName) {
    return res.status(400).json({
      error: "Collection name, filter field, and filter value are required",
    }); // Validate parameters
  }

  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection(collectionName);
    const querySnapshot = await collectionRef.get();

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(documents); // Return the documents
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: error.message }); // Handle errors
  }
}
