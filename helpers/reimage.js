export const migrate = (url) => {
  console.log(url);
  return url;
};

export const cloudinaryToReimage = (url, dimensions, format = "webp") => {
  if (!url) return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const fileName = url.split("/").pop();
  const objectId = fileName.split(".")[0];
  let rendition = "original";
  if (dimensions) rendition = `${dimensions}.${format}`;
  const reimageUrl = `https://files.reimage.dev/playspark/${objectId}/${rendition}`;
  return reimageUrl;
};
