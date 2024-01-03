// const cloudName = "dmj6utxgp";
// const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/dmj6utxgp`;

// export const getImagesByAspectRatio = async (aspectRatio) => {
//   try {
//     console.log(`${cloudinaryBaseUrl}/resources/image`);
//     const response = await fetch(`${cloudinaryBaseUrl}/resources/image`, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           "269498911656156:QHdZUJKT6iP8Yu2aUOGpMgqMctw"
//         ).toString("base64")}`,
//       },
//     });

//     const data = await response.json();
//     return data.resources;
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     throw error;
//   }
// };

const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: "dmj6utxgp",
  api_key: "269498911656156",
  api_secret: "QHdZUJKT6iP8Yu2aUOGpMgqMctw",
  secure: true,
});

export const getImagesByAspectRatio = (aspectRatio) => {
  return cloudinary;
};
