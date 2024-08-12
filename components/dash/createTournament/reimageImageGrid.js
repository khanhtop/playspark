import { CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ReimageGrid({ images, tags, onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(0);

  const handleImageUpload = () => {
    // Trigger file picker popup
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      setLoading(1);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", tags || []);
      setLoading(80);
      await fetch("https://api.reimage.dev/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
        },
        body: formData,
      });
      setLoading(100);
      onUpload();
      setSelectedImage(URL.createObjectURL(file));
      await delay(2000);
      setLoading(0);
    };
    input.click();
  };

  const delay = async (time) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, time)
    );
  };

  return (
    <div className="grid grid-cols-3 mt-4 gap-4">
      <div
        className="flex-1 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer flex items-center justify-center flex-col gap-4"
        onClick={handleImageUpload}
      >
        <CameraIcon className="mt-0 w-12 h-12 text-gray-300 mx-auto" />
        <div
          className={`w-full h-4 ${
            loading > 0 ? "bg-white/5" : "bg-white/0"
          } rounded-full overflow-hidden`}
        >
          <div
            style={{ width: `${loading.toString()}%`, transition: "5s all" }}
            className={`h-full bg-cyan-500 transition`}
          />
        </div>
      </div>
      {!images?.thumbnails &&
        Array(12)
          .fill({})
          .map((item, key) => (
            <div
              className="w-full rounded-xl overflow-hidden bg-black/100 animate-pulse aspect-square"
              key={key}
            />
          ))}
      {images?.thumbnails?.map((item, key) => (
        <div className="flex-1 rounded-xl overflow-hidden" key={item}>
          <img src={item} className="w-full h-full" />
        </div>
      ))}
      {/* {selectedImage && (
        <div className="flex-1">
          <img src={selectedImage} className="w-full h-full" />
        </div>
      )} */}
    </div>
  );
}
