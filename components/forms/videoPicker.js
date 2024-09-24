import { uploadImage } from "@/helpers/images";
import { mockVideos } from "@/helpers/mocks";
import { getMuxAssetID, getMuxAssetURL, getMuxUploadID } from "@/helpers/mux";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import MuxPlayer from "@mux/mux-player-react";
import { UpChunk } from "@mux/upchunk";
import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function VideoPicker({ children, video, onChange, landscape }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastVideo, setLastVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadState, setUploadState] = useState(0);
  const context = useAppContext();

  useEffect(() => {
    if (video) {
      setLastVideo(video);
    } else {
      const vid = mockVideos[Math.floor(Math.random() * mockVideos.length)];
      setLastVideo(vid);
      onChange(vid);
    }
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
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
        setLastVideo(muxUrl);
        onChange(muxUrl);
        setUploading(false);
      });
    } else {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row mb-1">
        <p className="text-white/70 mr-2">Sponsored Video</p>

        <Toggle
          checked={video}
          onChange={() => onChange(video ? null : lastVideo)}
          style={{ display: "inline-block" }}
        />
      </div>
      {context?.profile?.subscription?.tier == 4 && (
        <p className="text-white text-xs mb-2 mt-6 font-bold">Charged at $15</p>
      )}
      <div className="h-4" />
      <label htmlFor="video-input">
        {uploading ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: "200px",
              height: "400px",
              objectFit: "contain",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 20,
            }}
          >
            <ArrowPathIcon color="cyan" className="h-10 w-10 animate-spin" />
            <div className="w-[80%] h-3 bg-black border-[2px] border-white/80 mt-4 rounded-full overflow-hidden mt-8">
              <div
                style={{ width: `${uploadState}%`, transition: "1s all" }}
                className="h-full bg-cyan-500"
              />
            </div>
          </div>
        ) : video ? (
          <MuxPlayer
            style={{
              width: landscape ? "400px" : "200px",
              height: landscape ? "200px" : "400px",
              objectFit: "contain",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 20,
              overflow: "hidden",
            }}
            playbackId={video}
            metadata={{
              video_id: "video-id-54321",
              video_title: "Test video title",
              viewer_user_id: "user-id-007",
            }}
          />
        ) : (
          <div />
        )}
      </label>
      <input
        type="file"
        id="video-input"
        accept="video/mp4,video/x-m4v,video/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {video && children}
    </div>
  );
}
