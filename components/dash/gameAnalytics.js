import { firestore } from "@/helpers/firebase";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function GameAnalytics({ item }) {
  const [surveyData, setSurveyData] = useState();
  const playCount =
    0 + (item?.freemiumPlayCount ?? 0) + (item?.premiumPlayCount ?? 0);

  useEffect(() => {
    if (item?.surveyId) {
      getDoc(doc(firestore, "surveys", item.surveyId)).then((result) => {
        if (result.data()) {
          setSurveyData(result.data());
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-white/80">🎮 Play Count: {playCount}</p>
      <p className="text-white/80">
        ✍️ Survey Completions: {item.surveyCompletions ?? 0}
      </p>
      <p className="text-white/80">▶️ Video Views: {item.videoViews ?? 0}</p>
      {surveyData && (
        <div className="h-48 overflow-y-scroll bg-white/10 w-full px-4 py-4 mt-4 rounded-lg">
          <p className="text-lg mb-2">Survey Responses</p>
          <div>
            {surveyData?.survey?.map((item, key) => (
              <DropDown item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropDown({ item }) {
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (item) {
      let max = 0;
      item?.responses?.forEach((val) => {
        if (val?.chosenBy && val.chosenBy > max) max = val.chosenBy;
      });
      setMax(max);
    }
  }, [item]);
  return (
    <div
      style={{ height: open ? "auto" : 30, transition: "1s all" }}
      className="overflow-hidden mb-2"
    >
      <div
        onClick={() => setOpen(!open)}
        className="bg-white/20 px-2 h-[30px] flex justify-between items-center"
      >
        <p className="text-cyan-500">Q: {item.question}</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {open && (
        <div className="py-2">
          {item.responses.map((resp, key) => {
            return <Bar max={(resp.chosenBy / max) * 100} response={resp} />;
          })}
        </div>
      )}
    </div>
  );
}

function Bar({ response, max }) {
  const [width, setWidth] = useState(0);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (max) {
      setTimeout(() => {
        setWidth(max);
      }, 100);
      setTimeout(() => {
        setRendered(true);
      }, 600);
    }
  }, [max]);

  return (
    <div
      style={{ width: `${width}%`, transition: "0.5s width" }}
      className="h-8 bg-cyan-400 mb-2 flex items-center px-2"
    >
      {rendered && (
        <p className="text-xs animate-pulse">
          {response.value} ({response.chosenBy})
        </p>
      )}
    </div>
  );
}
