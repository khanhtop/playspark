import { uploadImage } from "@/helpers/images";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function ImagePicker({
  id,
  image,
  onChange,
  label,
  width,
  height,
}) {
  const context = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      uploadImage(file)
        .then((url) => {
          onChange(url);
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="text-white text-xs mb-2">
        {label}
        <a
          className="cursor-pointer text-cyan-500"
          onClick={() =>
            onChange(
              "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            )
          }
        >
          {` `}Remove
        </a>
      </p>
      <label htmlFor={id ? id : "file-input"}>
        {uploading ? (
          <div
            className="flex items-center justify-center"
            style={{
              width: width ?? "200px",
              height: height ?? "400px",
              objectFit: "contain",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 20,
            }}
          >
            <ArrowPathIcon color="cyan" className="h-10 w-10 animate-spin" />
          </div>
        ) : image || selectedImage ? (
          <img
            src={selectedImage ?? image}
            alt="Selected"
            style={{
              width: width ?? "200px",
              height: height ?? "400px",
              objectFit: "contain",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 20,
            }}
          />
        ) : (
          <div
            style={{
              width: width ?? "200px",
              height: height ?? "400px",
              border: "2px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Click to Select Image
          </div>
        )}
      </label>
      <input
        type="file"
        id={id ? id : "file-input"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
}
