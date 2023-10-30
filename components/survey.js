import { useState } from "react";

export default function Survey({ data, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const submitResponse = (resp) => {
    onComplete(resp);
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
