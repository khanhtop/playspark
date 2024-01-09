import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(uri) {
  const imgRef = ref(storage, Date.now().toString());
  const snapshot = await uploadBytes(imgRef, uri);
  let url = await getDownloadURL(snapshot.ref);
  console.log(url);
  return url;
}