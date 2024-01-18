import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import { getWordlePrompt, wordleSystemPrompt } from "@/helpers/prompts";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function GenWordArray({
  tournament,
  title,
  maxLength,
  setWords,
  setTheme,
}) {
  const [currentWord, setCurrentWord] = useState("");
  const [generating, setGenerating] = useState(false);

  const addWord = () => {
    setWords([...tournament.words, currentWord.toUpperCase()]);
    setCurrentWord("");
  };

  const generateWords = async () => {
    const messages = [
      getWordlePrompt(tournament.wordleTheme || "Sports"),
      { role: "user", content: tournament.words.join(",") },
    ];
    const response = await fetch("/api/internal/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    if (data.answer) {
      console.log(data.answer);
      const words = data.answer.filter(
        (a) => a.length === 5 && !tournament.words.includes(a)
      );
      return words.map((a) => a.toUpperCase());
    }
  };

  return (
    <div className="flex flex-col">
      <Input
        label="Theme (A single word to describe the theme of the game, e.g. Baseball"
        className="bg-white/5 flex-1 w-full py-2 mb-4 text-white"
        placeHolder="Theme"
        value={tournament.wordleTheme}
        labelColor="text-white/70"
        onChange={(e) => setTheme(e.target.value)}
      />
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
        {tournament.words.length > 2 && (
          <Button
            loading={generating}
            onClick={async () => {
              const res = await generateWords();
              setWords([...tournament.words, ...res]);
            }}
            className="w-36 bg-transparent border-cyan-500 border-2 text-white"
          >
            Generate More
          </Button>
        )}
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
