import { getMuxAssetID, getMuxAssetURL, getMuxUploadID } from "@/helpers/mux";
import { UpChunk } from "@mux/upchunk";
import { Button, Progress } from "flowbite-react";
import { useEffect, useState } from "react";

export default function MuxUploader({ file, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [uploadState, setUploadState] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    setUploadState(0);
    setUploaded(false);
    setUploading(false);
  }, [file]);

  const handleUpload = async (event) => {
    if (file) {
      setUploading(true);
      setUploadState(0);
      const { url, id } = await getMuxUploadID();
      const upload = UpChunk.createUpload({
        endpoint: url,
        file: file,
        chunkSize: 5120,
      });
      upload.on("error", (error) => {
        setUploading(false);
      });

      upload.on("progress", (progress) => {
        setUploadState(progress.detail);
      });

      upload.on("success", async () => {
        const assetId = await getMuxAssetID(id);
        const { muxUrl, duration } = await getMuxAssetURL(assetId);
        setUploaded(true);
        onUploadComplete(muxUrl);
        setUploading(false);
      });
    } else {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <Button
        isProcessing={uploading}
        className="bg-indigo-600 enabled:hover:bg-indigo-500 mt-2"
        disabled={!file || uploading || uploaded}
        onClick={handleUpload}
      >
        {uploaded ? "Finished" : "Upload"}
      </Button>
      {uploading && !uploaded && (
        <Progress className="mt-2" color="dark" progress={uploadState} />
      )}
      {uploaded && (
        <p className="text-green-500 text-xs mt-2">Video uploaded!</p>
      )}
    </div>
  );
}
