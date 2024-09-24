export async function reimageUpload({ file, tags = [] }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", tags);
  const response = await fetch("https://api.reimage.dev/upload/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
    },
    body: formData,
  });
  const json = await response.text();
  return json;
}
