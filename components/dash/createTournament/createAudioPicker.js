import { ArrowPathIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect } from "react";
import { useState } from "react";
import { configurableParameterTitles } from "@/helpers/configurability";

export default function CreateAudioPicker({
  aspectRatio,
  title,
  selected,
  dimension,
  updateAudio,
  gameTag,
}) {
  const [stateImages, setStateImages] = useState();

  console.log(stateImages);

  useEffect(() => {
    if (!stateImages) {
      fetch(`/api/cloudinaryAudioGet?gameTag=${gameTag}`)
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
        <h1 className="">{title}</h1>
        {/* <Tag text={gameTag} />
        <Tag text={aspectRatio} /> */}
      </div>

      <div className="flex gap-2">
        <div className="h-48 rounded-xl bg-white/10 overflow-hidden flex-1">
          <div className="h-[15%] flex items-center pl-2 bg-black/20 text-white/50 text-xs">
            <p>Current</p>
          </div>
          <div className="h-[85%] py-2 px-2 gap-2 flex flex-col overflow-y-scroll">
            {stateImages?.map((item, key) => (
              <div className={`flex gap-4`}>
                <div
                  className={`flex flex-1 rounded-full overflow-hidden border-2 flex gap-4 ${
                    selected === item.secure_url
                      ? "border-cyan-500"
                      : "border-transparent"
                  } rounded-full overflow-hidden`}
                >
                  <audio controls className="flex-1">
                    <source src={item.secure_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <button
                  onClick={() =>
                    selected !== item.secure_url && updateAudio(item.secure_url)
                  }
                  className={`${
                    selected === item.secure_url
                      ? "bg-white/20 text-white/80"
                      : "bg-cyan-500 text-white/80 font-bold"
                  }  rounded-full w-36`}
                >
                  Select{selected === item.secure_url && "ed"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* <WidgetLoader />
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
          onFailure={(a) => console.log(a)}
          customPublicId={"sample"}
          use_filename={false}
          destroy={false}
        /> */}
      </div>
    </>
  );
}
