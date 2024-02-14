import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { WinModal } from "./ui/modalTypes";
import { surveyCompleteCTA, surveyResponseCTA } from "@/helpers/events";

export default function Survey({ data, onComplete }) {
  const context = useAppContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [canClick, setCanClick] = useState(true);

  const submitResponse = async (resp) => {
    const currentSurvey = await getDoc(
      doc(firestore, "surveys", data.surveyId)
    );
    const surveyData = currentSurvey.exists()
      ? currentSurvey.data()?.survey
      : data?.survey;
    const respondents = currentSurvey.exists()
      ? currentSurvey.data()?.respondents || []
      : [];
    if (context?.loggedIn?.uid) {
      if (!respondents.includes(context?.loggedIn?.uid))
        respondents.push(context.loggedIn?.uid);
    }

    for (let r of resp) {
      const qIndex = surveyData.findIndex((a) => a.question === r.question);
      const rIndex = surveyData[qIndex].responses.findIndex(
        (a) => a.value === r.response
      );
      surveyData[qIndex].responses[rIndex].chosenBy =
        (surveyData[qIndex].responses[rIndex].chosenBy || 0) + 1;
    }

    await setDoc(doc(firestore, "surveys", data?.surveyId), {
      id: data.surveyId,
      survey: surveyData,
      respondents: respondents,
    });
    await updateDoc(
      doc(firestore, "tournaments", data.tournamentId.toString()),
      {
        surveyCompletions: increment(1),
      }
    );
    surveyCompleteCTA(context, data);
    context.setModal({
      title: "You Win",
      contents: (
        <WinModal
          data={data}
          onClaim={() => {
            context.setModal();
            context.setHasSeenSurvey(true);
            onComplete();
          }}
        />
      ),
    });
  };

  return (
    <div className="bg-[#222] flex-1 h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg h-[80%] w-[90%] bg-white  text-black flex flex-col py-8 px-4 items-center justify-center">
        <div
          style={{ backgroundColor: data.primaryColor }}
          className="text-white absolute w-[80%] h-12  border-2 border-white left-[10%] -top-4 rounded-full flex items-center justify-center"
        >
          <p className="font-octo text-2xl">Play & Win</p>
        </div>
        <div
          style={{ backgroundColor: data.primaryColor }}
          className="text-white absolute w-36 h-12  border-2 border-white  -bottom-4 rounded-full flex items-center justify-center"
        >
          <p className="font-octo text-2xl">
            {questionIndex + 1} / {data?.survey?.length}
          </p>
        </div>
        <div
          className={`flex-1 flex ${
            data.landscape ? "flex-row" : "flex-col"
          } items-center justify-center w-full`}
        >
          <div className="flex-1 flex flex-col px-4 items-center justify-center">
            <img src={data?.brandLogo} className="h-16 mb-2" />
            <div className="flex flex-col mb-4 ">
              <p className="text-center font-octo text-lg uppercase opacity-50">
                Question 1
              </p>
              <p className="text-center font-octo text-3xl">
                {data?.survey?.[questionIndex]?.question}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 w-full items-center">
            {data?.survey?.[questionIndex]?.responses?.map((item, key) => (
              <SurveyResponse
                data={data}
                canClick={canClick}
                setCanClick={setCanClick}
                item={item}
                key={key}
                onRespond={(response) => {
                  const r = [
                    ...responses,
                    {
                      question: data?.survey?.[questionIndex]?.question,
                      response: response,
                    },
                  ];
                  setResponses(r);
                  if (questionIndex < data?.survey?.length - 1) {
                    surveyResponseCTA(context, data);
                    setQuestionIndex(questionIndex + 1);
                    setCanClick(true);
                  } else {
                    submitResponse(r);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SurveyResponse({ data, item, onRespond, setCanClick, canClick }) {
  const [isClicked, setIsClicked] = useState(false);
  const clickButton = () => {
    setIsClicked(true);
    setCanClick(false);
    setTimeout(() => {
      setIsClicked(false);
      setTimeout(() => {
        onRespond(item.value);
      }, 200);
    }, 1000);
  };
  return (
    <button
      disabled={!canClick}
      onClick={() => canClick && clickButton()}
      style={{
        backgroundColor: isClicked ? data.primaryColor : "#2196F3",
        color: isClicked ? data.textColor : "#FFF",
        transition: "1s all",
      }}
      className="shadow-lg shadow-[#444]/50 bg-gray-200 w-full max-w-[300px] h-10 rounded-full hover:bg-cyan-500 border-[#999] border-[1px]"
    >
      <p>{item.value}</p>
    </button>
  );
}
