export function getImageWithSize(url, height = 200, width = 200) {
  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/dmj6utxgp/image/upload/";
  const [basePath, restOfPath] = url.split(cloudinaryBaseUrl);
  const resizedPath = `c_scale,h_${height},w_${width}/`;
  return cloudinaryBaseUrl + basePath + resizedPath + restOfPath;
}
