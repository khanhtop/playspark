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
      // staticImage.src = getMuxAsset(game.muxId, false);
      staticImage.src = `${game.backgroundImage}`;
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
      // setStaticImageUrl(`/screenshots/${game.screenshot}`);
      // setAnimatedImageUrl(`/screenshots/${game.screenshot}`);
      // setImageUrl(`/screenshots/${game.screenshot}`);
      setStaticImageUrl(`${game.backgroundImage}`);
      setAnimatedImageUrl(`${game.backgroundImage}`);
      setImageUrl(`${game.backgroundImage}`);
    }
  }, []);

  return (
    <div
      onMouseOver={() => setImageUrl(animatedImageUrl)}
      onMouseLeave={() => setImageUrl(staticImageUrl)}
      className={`${
        game.isPremium
          ? "bg-gradient-to-b from-amber-400 to-amber-600 text-black"
          : "bg-[#000] text-white"
      } rounded-lg  basis-[350px] p-4`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-titan uppercase">{game.name}</h3>
        {onDelete && (
          <XMarkIcon
            onClick={() => onDelete()}
            className="h-8 w-8 hover:text-sky-400 transition"
          />
        )}
        {!onDelete && game.isPremium && (
          <img className="h-6" src="/branding/crown.png" />
        )}
      </div>

      <h5 className="font-roboto text-md mb-4 opacity-100 h-[92px] overflow-hidden">
        {game.description}
      </h5>
      <div className="h-[540px] mt-6">
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

      <div className="flex gap-2 text-md font-bold">
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
