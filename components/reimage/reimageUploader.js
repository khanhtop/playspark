import { Button, FileInput, Label, Modal, Spinner } from "flowbite-react";
import ReimagePicker from "./reimagePicker";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { reimageUpload } from "./reimageHelpers";
import { useAppContext } from "@/helpers/store";

export default function ReimageUploadWidget({ gameTag, assetTag, onComplete }) {
  const context = useAppContext();
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileObjectUrl, setFileObjectUrl] = useState(null);

  const handleImageChange = (file) => {
    setFile(file.target.files?.[0]);
    setFileObjectUrl(URL.createObjectURL(file.target.files?.[0]));
  };

  const handleUpload = async () => {
    setLoading(true);
    await reimageUpload({
      file: file,
      tags: [gameTag, assetTag],
    });
    onComplete();
    setLoading(false);
    setShow(false);
  };

  return (
    <>
      <div
        className="cursor-pointer flex flex-col items-center justify-center bg-black/5 hover:opacity-80 rounded-lg w-24 text-black/20 border-black/10 border-2"
        onClick={() => setShow(true)}
      >
        <h3>Upload</h3>
        <PlusIcon className="h-8" />
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>Upload Assets</Modal.Header>
        <Modal.Body>
          <div className="flex w-full items-center justify-center">
            <Label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {loading ? (
                <div className="flex flex-col items-center py-4 gap-2">
                  <p>Uploading</p>
                  <Spinner />
                </div>
              ) : file ? (
                <img src={fileObjectUrl} className="h-24 object-cover my-2" />
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <FileInput onChange={handleImageChange} className="hidden" />
            </Label>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            disabled={loading}
            className="bg-zinc-400 enabled:hover:bg-zinc-500"
            onClick={() => {
              setLoading(false);
              setFile(null);
              setFileObjectUrl(null);
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            isProcessing={loading}
            onClick={handleUpload}
            className="bg-indigo-600 enabled:hover:bg-indigo-500"
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
