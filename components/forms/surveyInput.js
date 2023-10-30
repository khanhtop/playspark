import { useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Input from "./input";

export default function SurveyInput({ survey, onChange }) {
  const [lastSurvey, setLastSurvey] = useState([
    {
      question: "",
      responses: [
        {
          text: "",
          correct: true,
        },
        {
          text: "",
          correct: false,
        },
      ],
    },
  ]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-4 mt-4 mb-1 text-white">
        <p className="text-white mr-2">Add A Survey</p>
        <Toggle
          checked={survey}
          onChange={() => onChange(survey ? null : lastSurvey)}
        />
      </div>
      {survey?.map((item, key) => {
        return (
          <SurveyElement
            index={key}
            surveyData={item}
            key={key}
            onAddQuestion={(surveyData) => {
              onChange([...survey, surveyData]);
            }}
            onAddResponse={(questionIndex) => {
              const _survey = survey;
              _survey[questionIndex].responses.push({
                text: "",
                correct: false,
              });
              onChange(_survey);
            }}
            onDeleteResponse={(questionIndex, responseIndex) => {
              const _survey = survey;
              delete _survey[questionIndex]["responses"][responseIndex];
              console.log(_survey);
              onChange(_survey);
            }}
            onDeleteQuestion={(questionIndex) => {
              const _survey = survey;
              _survey.splice(questionIndex, questionIndex);
              onChange(_survey);
            }}
            onChangeResponse={(questionIndex, responseIndex, value) => {
              const _survey = survey;
              _survey[questionIndex]["responses"][responseIndex] = {
                value: value,
                correct:
                  _survey[questionIndex]["responses"][responseIndex]?.correct,
              };
              onChange(_survey);
            }}
            onChangeQuestion={(questionIndex, value) => {
              const _survey = survey;
              _survey[questionIndex].question = value;
              onChange(_survey);
            }}
          />
        );
      })}
    </div>
  );
}

function SurveyElement({
  surveyData,
  index,
  onAddQuestion,
  onAddResponse,
  onDeleteResponse,
  onDeleteQuestion,
  onChangeResponse,
  onChangeQuestion,
}) {
  return (
    <div className="bg-white/10 px-4 py-4 rounded-lg mt-4 flex flex-col gap-4 text-white">
      <div className="flex gap-2">
        <p>Question {index + 1}</p>
        {index > 0 && (
          <button
            onClick={() => onDeleteQuestion(index)}
            className="text-sm border-[1px] border-red-500 px-4 rounded-lg text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        )}
      </div>
      <Input
        label="Enter Question"
        className="bg-black border-cyan-400/50 border-[1px] w-full py-2 text-white"
        labelColor="text-white"
        onChange={(e) => onChangeQuestion(index, e.target.value)}
      />
      {surveyData.responses.map((item, key) => (
        <Input
          onChange={(e) => onChangeResponse(index, key, e.target.value)}
          withActionButton={
            key > 1
              ? {
                  text: "Delete",
                  action: () => onDeleteResponse(index, key),
                }
              : false
          }
          label={
            key === 0 ? "Enter Correct Response" : "Enter Incorrect Response"
          }
          className="flex-1 bg-black border-cyan-400/50 border-[1px] w-full py-2 text-white"
          labelColor="text-white"
        />
      ))}
      <div className="mt-4 flex justify-end w-full">
        <button
          onClick={() =>
            onAddQuestion({
              question: "",
              responses: [
                {
                  text: "",
                  correct: true,
                },
                {
                  text: "",
                  correct: false,
                },
              ],
            })
          }
          text="Add Response"
          className={`bg-cyan-400 text-white h-10 w-60 rounded-full flex items-center justify-center mr-2`}
        >
          Add New Question
        </button>
        <button
          onClick={() => onAddResponse(index)}
          text="Add Response"
          className={`bg-cyan-400 text-white h-10 w-60 rounded-full flex items-center justify-center`}
        >
          Add Response
        </button>
      </div>
    </div>
  );
}
