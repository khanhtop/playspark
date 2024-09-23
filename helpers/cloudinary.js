// export function getImageWithSize(url, height = 200, width = 200) {
//   width = Math.round(width)
//   height = Math.round(height)
//   const cloudinaryBaseUrl =
//     "https://res.cloudinary.com/dmj6utxgp/image/upload/";
//   const resizedPath = `c_scale,h_${height},w_${width}`;
//   // Split the URL into different parts
//   let parts = url.split("/");
//   // Insert the string at the desired position
//   parts.splice(6, 0, resizedPath);
//   // Reassemble the URL
//   const finalUrl = parts.join("/");

//   return finalUrl;
// }

export function getImageWithSize(url, height = 200, width = 200) {
  return url.replace("original", `h-${height}_w-${width}.webp`);
}
