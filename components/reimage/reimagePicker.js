import { FileInput, Label, Spinner } from "flowbite-react";
import { reimageUpload } from "./reimageHelpers";
import { useState } from "react";

export default function ReimagePicker({
  file,
  setFile,
  id,
  height = 200,
  aspectRatio = 1,
}) {
  const [loading, setLoading] = useState(false);
  const [aspect, setAspect] = useState(aspectRatio);

  console.log(aspect);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const { original, width, height } = await reimageUpload({ file: file });
      setAspect(width / height);
      console.log(original);
      setFile(original);
      setLoading(false);
      //   setUploading(true);
      //   uploadImage(file)
      //     .then((url) => {
      //       onChange(url);
      //     })
      //     .finally(() => {
      //       setUploading(false);
      //     });
    } else {
      //   setUploading(false);
    }
  };

  return (
    <div
      style={{ height: height, width: height * aspect }}
      className="flex w-full items-center justify-center"
    >
      <Label
        htmlFor={id}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {loading ? (
          <Spinner />
        ) : file ? (
          <img src={file} className="h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-center px-2 text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <FileInput onChange={handleImageChange} id={id} className="hidden" />
      </Label>
    </div>
  );
}
