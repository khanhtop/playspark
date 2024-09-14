import { useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Input from "./input";
import { useAppContext } from "@/helpers/store";

export default function SurveyInput({ survey, onChange }) {
  return (
    <div className="flex flex-col">
      {survey?.map((item, key) => {
        return (
          <SurveyElement
            surveyLength={survey?.length || 0}
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
  surveyLength,
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
    <div className="bg-white/10 rounded-lg flex flex-col gap-4 text-black">
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
        className="bg-zinc-100 border-[1px] w-full py-2 text-black"
        labelColor="text-black"
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
          className="flex-1 bg-zinc-100 border-[1px] w-full py-2 text-black"
          labelColor="text-black"
        />
      ))}
      <div className="mt-4 flex justify-end w-full">
        {index === surveyLength - 1 && (
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
            className={`bg-indigo-600 text-white h-10 w-48 rounded-lg flex items-center justify-center mr-2`}
          >
            Add New Question
          </button>
        )}
        <button
          onClick={() => onAddResponse(index)}
          text="Add Response"
          className={`bg-indigo-800 text-white h-10 w-36 rounded-lg flex items-center justify-center`}
        >
          Add Response
        </button>
      </div>
    </div>
  );
}
