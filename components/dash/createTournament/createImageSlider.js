import { ArrowPathIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect } from "react";
import { useState } from "react";
import { configurableParameterTitles } from "@/helpers/configurability";

export default function CreateImageSlider({
  aspectRatio,
  title,
  selected,
  dimension,
  updateSprite,
  gameTag,
}) {
  const [stateImages, setStateImages] = useState();

  useEffect(() => {
    if (!stateImages) {
      fetch(`/api/cloudinaryGet?aspectRatio=${aspectRatio}&gameTag=${gameTag}`)
        .then((raw) => {
          return raw.json();
        })
        .then((json) => {
          setStateImages(json);
        });
    }
  }, []);

  return (
    <>
      <div className="text-white/70 mb-3 mt-2 text-sm flex gap-2">
        <h1 className="">
          {configurableParameterTitles?.[gameTag]?.[dimension]?.text ?? title}
        </h1>
        <Tag text={gameTag} />
        <Tag text={aspectRatio} />
      </div>

      <div className="flex gap-2 ">
        <div className="h-48 rounded-xl bg-white/10 overflow-hidden ">
          <div className="h-[15%] flex items-center pl-2 bg-black/20 text-white/50 text-xs">
            <p>Current</p>
          </div>
          <div className="h-[85%] py-2 px-2 ">
            <Img item={{ secure_url: selected }} onSelect={() => null} />
          </div>
        </div>

        <div className="flex-1 h-48 rounded-xl w-full bg-white/10  whitespace-no-wrap">
          <div className="h-[15%] text-xs flex items-center pl-2 bg-black/20 text-white/50">
            <p>Library</p>
          </div>
          <div className="flex h-[85%] gap-2 py-2 px-2 overflow-x-scroll">
            {stateImages?.map((item, key) => (
              <Img
                item={item}
                key={key.toString() + item.secure_url}
                onSelect={() => updateSprite(item.secure_url)}
              />
            ))}
          </div>
        </div>

        <WidgetLoader />
        <Widget
          cropping={true}
          croppingDefaultSelectionRatio={0.5}
          sources={["local", "camera", "unsplash"]}
          resourceType={"image"}
          cloudName={"dmj6utxgp"}
          style={{ backgroundColor: "transparent" }}
          uploadPreset={"pfnzmu6k"}
          buttonText={
            <div className="text-white/20 hover:text-white/30 cursor-pointer transition w-40 h-48 border-4 border-white/10 bg-black/10 rounded-xl flex flex-col items-center justify-center">
              <CloudArrowDownIcon className="w-20 h-20" />
              <h3>Upload</h3>
            </div>
          }
          autoClose={false}
          onSuccess={({ event, info }) => {
            if (event === "success") {
              setTimeout(() => {
                setStateImages([info, ...stateImages]);
              }, 2000);
            }
          }}
          onFailure={() => null}
          customPublicId={"sample"}
          use_filename={false}
          destroy={false}
        />
      </div>
    </>
  );
}

function Tag({ text }) {
  return (
    <div className="bg-cyan-400 text-black px-4 rounded-full ">
      <p>{text}</p>
    </div>
  );
}
function Img({ item, selected, onSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);

    const imgElement = new Image();
    imgElement.src = item.secure_url;

    imgElement.onload = () => {
      setIsLoading(false);
      setImageError(false);
    };

    imgElement.onerror = () => {
      setIsLoading(false);
      setImageError(true);
    };

    // Cleanup the image element to avoid memory leaks
    return () => {
      imgElement.onload = null;
      imgElement.onerror = null;
    };
  }, [item.url]);

  return (
    <div
      onClick={() => {
        onSelect(item.url);
      }}
      className={`h-full flex-shrink-0 rounded-lg overflow-hidden border-2 ${
        selected ? "border-white" : "border-transparent cursor-pointer"
      }`}
    >
      {isLoading && (
        <div className="h-full w-36 flex items-center justify-center bg-black/50 text-white">
          <ArrowPathIcon className="w-12 h-12 animate-spin" />
        </div>
      )}
      {!isLoading && !imageError && (
        <img
          onError={(e) => {
            setImageError(true);
          }}
          src={item?.secure_url}
          className={`h-full ${imageError ? "hidden" : ""}`}
        />
      )}
      {imageError && (
        <div className="h-full flex items-center justify-center bg-red-500">
          Error loading image
        </div>
      )}
    </div>
  );
}
