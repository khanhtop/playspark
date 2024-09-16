import { ArrowPathIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect } from "react";
import { useState } from "react";
import { configurableParameterTitles } from "@/helpers/configurability";

export default function CreateAudioPicker({
  setLoading,
  fullHeight,
  title,
  selected,
  dimension,
  updateAudio,
  gameTag,
}) {
  const [stateImages, setStateImages] = useState();

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

  function parseNameFromURL(url) {
    const slashSplit = url.split("/").pop();
    const dotSplit = slashSplit.split(".")?.[0];
    const hyphenSplit = dotSplit.split("-");
    return hyphenSplit;
  }

  return (
    <>
      <div className="flex gap-2">
        <div
          className={`${
            fullHeight ? "h-full" : "h-72 overflow-hidden"
          } rounded-xl  flex-1`}
        >
          <div className="h-full py-2 gap-2 flex flex-col overflow-y-scroll">
            {stateImages?.map((item, key) => (
              <div className={`w-full flex flex-col`}>
                <div className="flex gap-2 mb-2">
                  {parseNameFromURL(item.secure_url)?.map((item, key) => (
                    <div className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-md uppercase">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mb-3">
                  <div className={`flex flex-1 rounded-md flex gap-4`}>
                    <audio controls className="flex-1">
                      <source src={item.secure_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <button
                    onClick={() =>
                      selected !== item.secure_url &&
                      updateAudio(item.secure_url)
                    }
                    className={`${
                      selected === item.secure_url
                        ? "bg-indigo-600 text-white"
                        : "bg-black/10"
                    }  rounded-md w-24 text-sm`}
                  >
                    Select{selected === item.secure_url && "ed"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
