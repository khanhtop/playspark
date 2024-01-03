import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dmj6utxgp",
  api_key: "269498911656156",
  api_secret: "QHdZUJKT6iP8Yu2aUOGpMgqMctw",
  secure: true,
});

export default async function handler(req, res) {
  try {
    const { aspectRatio } = req.query;

    if (!aspectRatio) {
      return res.status(400).json({ error: "Missing aspectRatio parameter" });
    }

    // Assuming 'aspectRatio' is the tag you want to query for
    cloudinary.v2.search
      .expression("resource_type:image AND tags=" + aspectRatio)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()
      .then((result) => res.status(200).json(result.resources));
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
