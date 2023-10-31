import { firestore } from "@/helpers/firebase";
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
  console.log(surveyData);
  return (
    <div className="flex flex-col gap-1 w-full">
      <p>Play Count: {playCount}</p>
      <p>Survey Completions: {item.surveyCompletions ?? 0}</p>
      <p>Video Views: {item.videoViews ?? 0}</p>
      {surveyData && (
        <div className="h-48 overflow-y-scroll bg-white/10 w-full px-4 py-4 mt-4 rounded-lg">
          <p className="text-lg mb-2">Survey Responses</p>
          <div>
            {surveyData?.survey?.map((item, key) => (
              <div className="flex flex-col mb-2">
                <p className="text-cyan-500">{item.question}</p>
                {item.responses.map((resp, key) => (
                  <p className="text-sm text-white/75">
                    {resp?.chosenBy ?? 0} Responded - {resp.value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
