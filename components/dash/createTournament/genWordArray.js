import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function GenWordArray({
  tournament,
  title,
  maxLength,
  setWords,
}) {
  const [currentWord, setCurrentWord] = useState("");

  const addWord = () => {
    setWords([...tournament.words, currentWord.toUpperCase()]);
    setCurrentWord("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-4">
        <Input
          label={title}
          className="bg-white/5 flex-1 w-full py-2 mb-4 text-white"
          placeHolder="Type a word"
          maxLength={maxLength}
          value={currentWord}
          labelColor="text-white/70"
          onChange={(e) => setCurrentWord(e.target.value)}
        />
        <Button
          onClick={() => addWord()}
          disabled={currentWord.length < 5}
          className="mt-5 px-8"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {tournament.words.map((item, key) => (
          <Word
            word={item}
            key={key}
            onClick={() => {
              setWords(tournament.words.filter((a) => a !== item));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Word({ word, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-warning transition group items-center justify-center gap-2 text-black bg-cyan-500 hover:bg-red-500 w-36 py-2 rounded-lg"
    >
      <p>{word}</p>
      <TrashIcon className="hidden group-hover:flex h-5 w-5" />
    </div>
  );
}
