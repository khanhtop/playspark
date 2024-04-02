import { useState, useEffect } from "react";
import ReimageGrid from "./reimageImageGrid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function CreateConfigReimage({ tournament, setTournament }) {
  const [selectedSprite, setSelectedSprite] = useState(0);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  const tags = tournament?.reimageSprites[selectedSprite]?.requiredTags;

  const fetchImages = () => {
    setLoading(true);
    fetch(`https://api.reimage.dev/get/tags?${tags.join("&")}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
      },
    })
      .then((raw) => {
        return raw.json();
      })
      .then((json) => {
        setLoading(false);
        setImages({
          ...images,
          [tournament?.reimageSprites[selectedSprite]?.key]: json,
        });
      });
  };

  useEffect(() => {
    if (!images[tournament?.reimageSprites[selectedSprite]?.key]) {
      fetchImages();
    }
  }, [selectedSprite]);

  console.log(images);

  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex-1 text-white flex gap-4">
          {tournament.reimageSprites?.map((item, key) => (
            <Tab
              onClick={() => setSelectedSprite(key)}
              name={item.name}
              key={key}
              selected={selectedSprite === key}
            />
          ))}
        </div>

        {loading && (
          <ArrowPathIcon className="text-cyan-500 h-5 w-5 animate-spin" />
        )}
      </div>

      <ReimageGrid
        tags={tags}
        images={images?.[tournament?.reimageSprites[selectedSprite]?.key]}
        onUpload={fetchImages}
      />
    </div>
  );
}

function Tab({ name, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border-b-2 pb-2 ${
        selected
          ? "border-b-cyan-500 text-white/100"
          : "border-b-transparent text-white/50 cursor-pointer"
      }`}
    >
      <p>{name}</p>
    </div>
  );
}
