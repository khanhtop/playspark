import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(uri) {
  const imgRef = ref(storage, Date.now().toString());
  const snapshot = await uploadBytes(imgRef, uri);
  let url = await getDownloadURL(snapshot.ref);
  console.log(url);
  return url;
}

export function scaleImageViaCloudinary(url, height, width) {
  const h = Math.round(height)
  const w = Math.round(width)
  const transformedUrl = url.replace('/upload/', `/upload/c_scale,h_${h},w_${w}/q_auto/f_auto/`);
  return transformedUrl;
}