import { useEffect, useRef, useState, createRef } from "react";

export default function CreateAudioPicker({
  fullHeight,
  selected,
  updateAudio,
  gameTag,
}) {
  const [stateImages, setStateImages] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    if (stateImages.length === 0) {
      fetch(`/api/cloudinaryAudioGet?gameTag=${gameTag}`)
        .then((raw) => raw.json())
        .then((json) => setStateImages(json));
    }
  }, [gameTag, stateImages]);

  function parseNameFromURL(url) {
    const slashSplit = url.split("/").pop();
    const dotSplit = slashSplit.split(".")?.[0];
    const hyphenSplit = dotSplit.split("-");
    return hyphenSplit;
  }

  const handlePlay = (audioRef, item) => {
    if (currentTrack && currentTrack !== audioRef.current) {
      currentTrack.pause();
      currentTrack.currentTime = 0;
    }

    setCurrentTrack(audioRef.current);

    if (!audioRef.current.src) {
      audioRef.current.src = item.secure_url;
      audioRef.current.play();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex gap-2">
      <div
        className={`${
          fullHeight ? "h-full" : "h-72 overflow-hidden"
        } rounded-xl flex-1`}
      >
        <div className="h-full py-2 gap-2 flex flex-col overflow-y-scroll">
          {stateImages.map((item, index) => {
            if (!audioRefs.current[index]) {
              audioRefs.current[index] = createRef();
            }

            return (
              <div key={index} className="w-full flex flex-col">
                <div className="flex gap-2 mb-2">
                  {parseNameFromURL(item.secure_url)?.map((part, key) => (
                    <div
                      key={key}
                      className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-md uppercase"
                    >
                      {part}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mb-3">
                  <div className="flex flex-1 rounded-md flex gap-4">
                    <audio
                      controls
                      className="flex-1"
                      ref={audioRefs.current[index]}
                      onPlay={() => handlePlay(audioRefs.current[index], item)}
                    >
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
