import { useRef, useState } from "react";
import Input from "../forms/input";
import {
  ChromePicker,
  CompactPicker,
  PhotoshopPicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker,
} from "react-color";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import UIButton from "../ui/button";
import Text from "../ui/text";
import ImagePicker from "../forms/imagePicker";
import VideoPicker from "../forms/videoPicker";
import { mockVideos } from "@/helpers/mocks";
import SurveyInput from "../forms/surveyInput";

export default function CreateTournamentModal({ data, hide }) {
  const context = useAppContext();
  const [tournament, setTournament] = useState({ ...data });
  const [adding, setAdding] = useState(false);
  const [stage, setStage] = useState(1);

  const createTournament = async () => {
    setAdding(tournament.id);
    const _myGames = context.profile?.myGames || [];
    const _uid = Date.now();
    _myGames.push(_uid);
    await setDoc(doc(firestore, "tournaments", _uid.toString()), {
      ...tournament,
      tournamentId: _uid,
      ownerId: context.loggedIn?.uid,
    });
    setAdding(false);
    hide();
  };

  const surveyId = useRef(Date.now().toString());

  console.log(tournament);

  return (
    <div
      onClick={() => hide()}
      className="fixed h-screen w-screen top-0 left-0 bg-black/95 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-black border-cyan-400 border-2 w-[90%] max-w-[1000px] h-[90%] max-h-[800px] rounded-xl p-8 "
      >
        <Header
          text="Set up your tournament"
          buttonText={stage < 3 ? "Continue" : "Finish"}
          flashing={stage < 3 ? false : true}
          ready={true}
          adding={adding}
          onClick={() => {
            if (stage < 3) {
              setStage(stage + 1);
            } else {
              createTournament();
            }
          }}
        />
        <Progress length={3} stage={stage} setStage={setStage} />
        {stage === 1 && (
          <div className="flex-1 overflow-y-scroll pb-4 flex gap-8">
            <div className="flex-1">
              <p className="flex-1 text-white mt-1 mb-4">Tournament Settings</p>
              <Input
                label="Tournament Name"
                className="bg-black border-cyan-400/50 border-[1px] w-full py-2 text-white"
                placeHolder={tournament.name}
                value={tournament.name}
                labelColor="text-white"
                onChange={(e) =>
                  setTournament({ ...tournament, name: e.target.value })
                }
              />
              <p className="text-xs text-white mt-4 mb-1">Theme</p>
              <select
                className="bg-transparent text-white w-full h-10 border-cyan-400/50 border-[1px]"
                onChange={(e) =>
                  setTournament({ ...tournament, theme: e.target.value })
                }
              >
                <option default value="default">
                  Default
                </option>
                <option value="pixel">Pixel</option>
              </select>
              <ColorPicker
                label="Primary Color"
                labelColor="text-white"
                value={tournament.primaryColor}
                onSelect={(a) => {
                  setTournament({ ...tournament, primaryColor: a.hex });
                }}
              />
              <ColorPicker
                label="Text Color"
                value={tournament.textColor}
                onSelect={(a) => {
                  setTournament({ ...tournament, textColor: a.hex });
                }}
              />
            </div>
            <div className="flex flex-col items-center text-white p-2">
              <div className="">
                <p className="flex-1">Preview</p>
                <Preview tournament={tournament} />
              </div>
            </div>
          </div>
        )}
        {stage === 2 && (
          <div className="flex-1 overflow-y-scroll mb-4 flex">
            <div className="flex-1">
              <p className="text-white mt-1 mb-4">Tournament Branding</p>
              <ImagePicker
                label="Replace Background Image (Aim for 800px x 1600px)"
                image={tournament.backgroundImage}
                onChange={(url) => {
                  setTournament({ ...tournament, backgroundImage: url });
                }}
              />

              <VideoPicker
                video={tournament.sponsoredVideo}
                onChange={(id) => {
                  setTournament({ ...tournament, sponsoredVideo: id });
                }}
              />
              <SurveyInput
                survey={tournament.survey}
                onChange={(survey) => {
                  setTournament({
                    ...tournament,
                    survey: survey,
                    surveyId: surveyId.current,
                  });
                }}
              />
            </div>

            <div className="flex flex-col items-center text-white p-2">
              <div className="">
                <p className="flex-1">Preview</p>
                <Preview tournament={tournament} />
              </div>
            </div>
          </div>
        )}
        {stage === 3 && (
          <div className="flex-1 overflow-y-scroll text-white">
            <p>
              Here is a quick preview of how your game colors and branding will
              look. If you are happy, click "Finish" to add the game to your
              library.
            </p>
            <Preview tournament={tournament} />
          </div>
        )}
      </div>
    </div>
  );
}

function Preview({ tournament }) {
  return (
    <div
      style={{ backgroundColor: tournament.primaryColor }}
      className={`mt-4 w-[200px] h-[400px] rounded-lg overflow-hidden relative flex flex-col items-center justify-end`}
    >
      <img
        src={tournament.backgroundImage}
        className="object-cover absolute h-full w-full"
      />
      <div className="text-white z-20 flex flex-col items-center mb-12">
        {/* <h1 className="text-lg" style={{ color: tournament.textColor }}>
          {tournament.name}
        </h1> */}
        <Text {...tournament}>{tournament.name}</Text>
        <UIButton {...tournament} className="mt-2" text="Start" />
        {/* <div
          style={{ backgroundColor: tournament.primaryColor }}
          className="rounded-lg h-10 w-40 flex items-center justify-center mt-4"
        >
          <p style={{ color: tournament.textColor }}>Start</p>
        </div> */}
      </div>
    </div>
  );
}

function Header({ ready, text, onClick, buttonText, adding, flashing }) {
  return (
    <div className="flex text-white justify-between items-center pb-6 border-b-[1px] border-b-gray-200/20">
      <h1 className="text-2xl">{text}</h1>
      <button
        disabled={adding}
        onClick={onClick}
        className={`${
          adding
            ? "bg-gray-300"
            : flashing
            ? "bg-green-400"
            : ready
            ? "bg-cyan-400 text-white"
            : "bg-gray-300 text-black/50"
        } ${
          flashing && "animate-pulse"
        } h-10 w-60 rounded-full flex items-center justify-center`}
      >
        {adding ? (
          <ArrowPathIcon className="h-5 w-5 text-white animate-spin" />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
}

function Progress({ stage, length, setStage }) {
  const data = ["Name & Colors", "Branding", "Finishing Up"];
  return (
    <div className="border-b-[1px] border-b-gray-200/20 mb-4">
      <div className="mt-4 mb-4 flex">
        {Array(length)
          .fill(0)
          .map((item, key) => (
            <div
              onClick={() => setStage(key + 1)}
              className="cursor-pointer flex-1 flex flex-col items-center"
            >
              <div
                className={`h-2 w-full mb-4 flex items-center justify-center cursor-pointer ${
                  stage > key
                    ? "bg-cyan-400 text-white"
                    : "bg-transparent text-black/30"
                }`}
              >
                <div
                  className={`${
                    stage > key ? "bg-cyan-400" : "bg-cyan-400/10"
                  } rounded-full h-6 w-6 flex items-center justify-center`}
                >
                  {key < 2 ? (
                    <ChevronRightIcon className="h-4 w-4 text-black" />
                  ) : (
                    <CheckIcon className="h-4 w-4 text-black" />
                  )}
                </div>
              </div>
              <p
                className={`${
                  stage > key ? "text-white" : "text-white/20"
                } text-sm text-white`}
              >
                {data[key]}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

function ColorPicker({ label, value, onSelect }) {
  return (
    <div className="mt-4">
      <p className="text-xs text-black/70 mb-4 text-white">{label}</p>
      <TwitterPicker color={value} onChangeComplete={onSelect} />
    </div>
  );
}
