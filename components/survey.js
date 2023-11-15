import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function Survey({ data, onComplete }) {
  const context = useAppContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

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
    console.log(data?.tournamentId);
    await updateDoc(
      doc(firestore, "tournaments", data.tournamentId.toString()),
      {
        surveyCompletions: increment(1),
      }
    );
    context.setHasSeenSurvey(true);
    onComplete();
  };

  return (
    <div className="bg-white flex-1 h-full text-black flex flex-col py-8 px-4 items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <p className="mb-8 text-xl text-center">
          {data?.survey?.[questionIndex]?.question}
        </p>
        <div className="flex flex-col gap-4 w-full items-center">
          {data?.survey?.[questionIndex]?.responses?.map((item, key) => (
            <SurveyResponse
              data={data}
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
                  setQuestionIndex(questionIndex + 1);
                } else {
                  submitResponse(r);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SurveyResponse({ data, item, onRespond }) {
  const [isClicked, setIsClicked] = useState(false);
  const clickButton = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setTimeout(() => {
        onRespond(item.value);
      }, 200);
    }, 1000);
  };
  return (
    <button
      disabled={isClicked}
      onClick={() => clickButton()}
      style={{
        backgroundColor: isClicked ? data.primaryColor : "#EEE",
        color: isClicked ? data.textColor : "#222",
        transition: "1s all",
      }}
      className="bg-gray-200 w-full max-w-[300px] h-20 rounded-full hover:bg-cyan-500 border-[#999] border-[1px]"
    >
      <p>{item.value}</p>
    </button>
  );
}
