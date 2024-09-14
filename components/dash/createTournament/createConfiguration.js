import { useEffect, useMemo, useState } from "react";
import CreateAudioPicker from "./createAudioPicker";
import CreateGlbPicker from "./createGlbPicker";
import CreateImageSlider from "./createImageSlider";
import GenWordArray from "./genWordArray";
import { configurableParameterTitles } from "@/helpers/configurability";
import { Label, Spinner } from "flowbite-react";
import { cloudinaryToReimage } from "@/helpers/reimage";
import {
  ArrowUpCircleIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";

export default function CreateConfiguration({
  tournament,
  setTournament,
  isAdmin,
}) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [assets, setAssets] = useState([]);
  const [aspect, setAspect] = useState("aspect-[1.0]");
  const [rendering, setRendering] = useState(false);

  const isSpriteSheet = useMemo(() => {
    return configurableParameterTitles?.[tournament?.cloudinaryGameTag]?.[
      selectedTag
    ]?.isSpriteSheet;
  }, [selectedTag]);

  // Generate objects array
  const getAssetsArray = useMemo(() => {
    const mappings = Object.keys(tournament.tags).map((tag) => ({
      tag: tag,
      value: tournament?.tags?.[tag] ?? null,
      text:
        configurableParameterTitles?.[tournament?.cloudinaryGameTag]?.[tag]
          ?.text ?? tag,
    }));
    setSelectedTag(mappings[0].tag);
    return mappings;
  }, [tournament.tags]);

  //

  useEffect(() => {
    if (selectedTag) {
      setAssets([]);
      setRendering(true);
      const tag = tournament.tags?.[selectedTag];
      setAspect(`aspect-[${tag}]`);
      fetch(
        `https://api.reimage.dev/get/tags?${tournament.cloudinaryGameTag}&${tag}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
          },
        }
      )
        .then((raw) => {
          return raw.json();
        })
        .then((json) => {
          setRendering(false);
          setAssets(json.objects);
        });
    }
  }, [selectedTag]);

  return (
    <div className="flex flex-col h-full flex-1">
      <Label className="text-black/50 mb-2">Select Asset To Modify</Label>
      <AssetSwitcher
        tags={getAssetsArray}
        selected={selectedTag}
        onSelect={(asset) => setSelectedTag(asset)}
      />
      {rendering ? (
        <div />
      ) : (
        <div className="w-full overflow-x-hidden mt-6 bg-black/5 px-4 py-4 flex gap-4 rounded-lg">
          <div
            className={`bg-white px-2 flex flex-col gap-2 py-2 rounded-lg items-center`}
          >
            <p className="text-sm text-black/50">Current</p>
            <img
              className={`${aspect} w-16`}
              src={cloudinaryToReimage(tournament?.[selectedTag], "w-300")}
            />
          </div>
          <div
            className={`bg-white px-2 flex flex-col gap-2 py-2 rounded-lg items-center`}
          >
            <p className="text-sm text-black/50">Upload</p>
            <ArrowUpOnSquareStackIcon
              className={`${aspect} w-16 text-black/20`}
            />
          </div>
        </div>
      )}
      {rendering ? (
        <div className="flex-1 flex flex-col gap-4 items-center justify-center">
          <Spinner className="h-12 w-12 text-indigo-600" />
          <p className="text-black/50">Loading Assets...</p>
        </div>
      ) : (
        <>
          <p className="mt-4 mb-2">Select a new asset</p>
          <div
            className={`grid ${
              isSpriteSheet ? "grid-cols-2" : "grid-cols-5"
            } gap-4 overflow-y-scroll flex-1`}
          >
            {assets.map((item, key) => (
              <Asset
                key={key}
                item={item}
                aspect={aspect}
                isSpriteSheet={isSpriteSheet}
                currentAsset={cloudinaryToReimage(tournament?.[selectedTag])}
                onSelect={(a) => {
                  setTournament({ ...tournament, [selectedTag]: a });
                }}
              />
            ))}
          </div>
        </>
      )}
      {/* <p className="text-white/70 text-sm mb-2">Game Instructions</p> */}
      {/* <textarea
        onChange={(e) =>
          setTournament({ ...tournament, instructions: e.target.value })
        }
        className="bg-white/10 text-white rounded-xl p-4 mb-4"
      ></textarea> */}
      {/* {tournament?.tags?.["glbOne"] && (
        <CreateGlbPicker
          isAdmin={isAdmin}
          dimension="glbOne"
          gameTag={tournament?.cloudinaryGameTag}
          aspectRatio={tournament?.tags?.["glbOne"]}
          title={`3D Object One`}
          selected={tournament.glbOne}
          updateSprite={(a) => {
            setTournament({ ...tournament, glbOne: a });
          }}
          pickerZoom={0.2}
        />
      )}
      {tournament?.tags?.["glbTwo"] && (
        <CreateGlbPicker
          isAdmin={isAdmin}
          dimension="glbTwo"
          gameTag={tournament?.cloudinaryGameTag}
          aspectRatio={tournament?.tags?.["glbTwo"]}
          title={`3D Object Two`}
          selected={tournament.glbTwo}
          updateSprite={(a) => {
            setTournament({ ...tournament, glbTwo: a });
          }}
          pickerZoom={0.5}
        />
      )}
      {tournament?.tags?.["backgroundSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="backgroundSprite"
          aspectRatio={tournament?.tags?.["backgroundSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Background Sprite`}
          selected={tournament.backgroundSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, backgroundSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["playerSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="playerSprite"
          aspectRatio={tournament?.tags?.["playerSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Player Sprite`}
          selected={tournament.playerSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, playerSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["enemySprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="enemySprite"
          aspectRatio={tournament?.tags?.["enemySprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Enemy Sprite`}
          selected={tournament.enemySprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, enemySprite: a });
          }}
        />
      )}
      {tournament?.tags?.["objectSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="objectSprite"
          aspectRatio={tournament?.tags?.["objectSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Object Sprite`}
          selected={tournament.objectSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, objectSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["powerUpSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="powerUpSprite"
          aspectRatio={tournament?.tags?.["powerUpSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Power Up Sprite`}
          selected={tournament.powerUpSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, powerUpSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteOne"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteOne"
          aspectRatio={tournament?.tags?.["additionalSpriteOne"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 1`}
          selected={tournament.additionalSpriteOne}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteOne: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteTwo"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteTwo"
          aspectRatio={tournament?.tags?.["additionalSpriteTwo"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 2`}
          selected={tournament.additionalSpriteTwo}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteTwo: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteThree"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteThree"
          aspectRatio={tournament?.tags?.["additionalSpriteThree"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 3`}
          selected={tournament.additionalSpriteThree}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteThree: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteFour"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteFour"
          aspectRatio={tournament?.tags?.["additionalSpriteFour"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 4`}
          selected={tournament.additionalSpriteFour}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteFour: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteFive"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteFive"
          aspectRatio={tournament?.tags?.["additionalSpriteFive"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 5`}
          selected={tournament.additionalSpriteFive}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteFive: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteSix"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteSix"
          aspectRatio={tournament?.tags?.["additionalSpriteSix"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 6`}
          selected={tournament.additionalSpriteSix}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteSix: a });
          }}
        />
      )}
      {tournament?.tags?.["backgroundMusic"] && (
        <CreateAudioPicker
          isAdmin={isAdmin}
          dimension="backgroundMusic"
          gameTag={"bgm"}
          title={`Background Music`}
          selected={tournament.backgroundMusic}
          updateAudio={(a) => {
            setTournament({ ...tournament, backgroundMusic: a });
          }}
        />
      )}

      {tournament?.words && (
        <GenWordArray
          tournament={tournament}
          maxLength={5}
          validationFn={(a) => {
            null;
          }}
          isAdmin={isAdmin}
          title={`Words`}
          setWords={(a) => {
            setTournament({ ...tournament, words: a });
          }}
          setTheme={(a) => {
            setTournament({ ...tournament, wordleTheme: a });
          }}
        />
      )} */}
    </div>
  );
}

function AssetSwitcher({ tags, selected, onSelect }) {
  return (
    <div className="bg-black/10 flex px-1 py-1 gap-2 rounded-full items-center px-2">
      <ChevronLeftIcon className="h-6 w-6 text-black/20" />
      <div className="overflow-x-scroll no-scrollbar flex w-full">
        {tags.map((item, key) => (
          <div
            onClick={() => onSelect(item.tag)}
            className={`${
              selected === item.tag
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "bg-black/0 cursor-pointer text-black/30"
            } px-4 rounded-full text-sm flex-shrink-0 h-8 flex items-center`}
            key={key}
          >
            {item.text}
          </div>
        ))}
      </div>
      <ChevronRightIcon className="h-6 w-6 text-black/20" />
    </div>
  );
}

function Asset({ aspect, item, currentAsset, onSelect, isSpriteSheet }) {
  return (
    <div
      onClick={() => onSelect(item + "/original")}
      className={`${aspect} ${
        currentAsset === item + "/original" ? "outline-4 border-indigo-500" : ""
      } border-2 shadow-md p-2 rounded-lg`}
    >
      <img
        className="h-full w-full object-contain"
        src={isSpriteSheet ? `${item}/w-800.webp` : `${item}/w-400.webp`}
      />
    </div>
  );
}
