import { getMuxAsset } from "@/helpers/mux";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function GameCard({
  game,
  onDemo,
  onAdd,
  added,
  buttonText,
  saving,
  onDelete,
}) {
  const [staticImageUrl, setStaticImageUrl] = useState();
  const [animatedImageUrl, setAnimatedImageUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    if (game.muxId) {
      const staticImage = new Image();
      const animatedImage = new Image();
      staticImage.src = getMuxAsset(game.muxId, false);
      animatedImage.src = getMuxAsset(game.muxId);
      staticImage.onload = () => {
        setImageUrl(staticImage.src);
        setStaticImageUrl(staticImage.src);
      };
      animatedImage.onload = () => {
        setAnimatedImageUrl(animatedImage.src);
        setLoading(false);
      };
    } else {
      setLoading(false);
      setStaticImageUrl(`/screenshots/${game.screenshot}`);
      setAnimatedImageUrl(`/screenshots/${game.screenshot}`);
      setImageUrl(`/screenshots/${game.screenshot}`);
    }
  }, []);

  return (
    <div
      onMouseOver={() => setImageUrl(animatedImageUrl)}
      onMouseLeave={() => setImageUrl(staticImageUrl)}
      className="bg-[#000] rounded-lg text-white basis-[300px] p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg">{game.name}</h3>
        {onDelete && (
          <XMarkIcon
            onClick={() => onDelete()}
            className="h-8 w-8 hover:text-sky-400 transition"
          />
        )}
      </div>

      <h5 className="text-xs mb-4 text-white/75 h-[80px] overflow-ellipsis">
        {game.description}
      </h5>
      <div className="h-[400px]">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <ArrowPathIcon className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <img
            src={imageUrl}
            className="rounded-md h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex gap-2 text-sm">
        <button
          onClick={() => onAdd()}
          disabled={added || saving}
          className={`w-full ${
            added || saving ? "bg-gray-500" : "bg-cyan-400 hover:bg-cyan-600"
          } text-white rounded-md mt-4 py-3 transition flex items-center justify-center`}
        >
          {saving ? (
            <ArrowPathIcon className="text-white h-5 w-5 animate-spin" />
          ) : added ? (
            "Already Added"
          ) : (
            buttonText
          )}
        </button>
        <button
          onClick={() => onDemo()}
          className="w-[100px] bg-cyan-400 text-white rounded-md mt-4 py-3  hover:bg-cyan-600 transition"
        >
          Demo
        </button>
      </div>
    </div>
  );
}
