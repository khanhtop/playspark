import { CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ReimageGrid({ images, tags, onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    // Trigger file picker popup
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", tags || []);
      await fetch("https://api.reimage.dev/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
        },
        body: formData,
      });
      onUpload();
      setSelectedImage(URL.createObjectURL(file));
    };
    input.click();
  };

  return (
    <div className="grid grid-cols-3 mt-4 gap-4">
      <div
        className="flex-1 p-24 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer"
        onClick={handleImageUpload}
      >
        <CameraIcon className="w-12 h-12 text-gray-300 mx-auto" />
      </div>
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
