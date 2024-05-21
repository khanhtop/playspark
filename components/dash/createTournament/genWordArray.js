import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import { getWordlePrompt, wordleSystemPrompt } from "@/helpers/prompts";
import { getRandomWordsByTheme, pregenWordles } from "@/helpers/wordGames";
import { custom } from "@cloudinary/url-gen/qualifiers/region";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function GenWordArray({
  tournament,
  title,
  maxLength,
  setWords,
  setTheme,
}) {
  const [gameTheme, setGameTheme] = useState("other");
  const [predefinedWords, setPredefinedWords] = useState(
    getRandomWordsByTheme("other")
  );
  const [currentWord, setCurrentWord] = useState("");
  const [generating, setGenerating] = useState(false);
  const [customWords, setCustomWords] = useState([]);

  const addWord = () => {
    setWords([...tournament.words, currentWord.toUpperCase()]);
    setCustomWords([...customWords, currentWord.toUpperCase()]);
    setCurrentWord("");
  };

  const generateWords = async () => {
    const messages = [
      getWordlePrompt(),
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
      const words = data.answer.filter(
        (a) => a.length === 5 && !tournament.words.includes(a)
      );
      return words.map((a) => a.toUpperCase());
    }
  };

  const customWordCount = customWords.length;
  const predefinedWordCount = tournament.words.length - customWords.length;

  return (
    <div className="flex flex-col mt-4">
      <p className="text-xs text-white mb-1">Game Theme</p>
      <select
        value={gameTheme}
        className="bg-transparent text-white w-full h-10 border-cyan-400/50 border-[1px]"
        onChange={(e) => {
          setGameTheme(e.target.value);
          setPredefinedWords(getRandomWordsByTheme(e.target.value));
          setWords([]);
          setCustomWords([]);
        }}
      >
        <option value="other">Other</option>
        {Object.keys(pregenWordles).map((item, key) => {
          return <option value={item}>{item}</option>;
        })}
      </select>

      <>
        <p className="text-xs text-white mb-1 mt-4">
          Select Predefined Words {`(${predefinedWordCount} Added)`}
        </p>
        <div className="text-white flex flex-wrap gap-2">
          {predefinedWords.map((item, key) => {
            return (
              <Word
                added={tournament.words.includes(item)}
                word={item}
                predefined={true}
                onAdd={(w) => {
                  setWords([...tournament.words, w]);
                }}
                onRemove={(w) => {
                  setWords(tournament.words.filter((a) => a !== w));
                }}
              />
            );
          })}
        </div>
        <div className="flex-col flex">
          <div className="flex w-full gap-4 mt-4">
            <Input
              label={`Add Your Own Words (${customWordCount} Added)`}
              className="bg-white/5 flex-1 w-full py-2 mb-4 text-white"
              placeHolder="Enter A Word"
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
            {customWords.map((item, key) => (
              <Word
                word={item}
                key={key}
                onClick={() => {
                  setWords(tournament.words.filter((a) => a !== item));
                  setCustomWords(customWords.filter((a) => a !== item));
                }}
              />
            ))}
            {customWords.length > 0 && tournament.words.length > 2 && (
              <Button
                loading={generating}
                onClick={async () => {
                  const res = await generateWords();
                  setWords([...tournament.words, ...res]);
                  setCustomWords([...customWords, ...res]);
                }}
                className="w-36 bg-transparent border-cyan-500 border-2 text-white"
              >
                Generate More
              </Button>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

function EditableWord({ word, added, predefined, onClick, onAdd, onRemove }) {
  return (
    <div
      onClick={() => {
        if (predefined && added) {
          onRemove(word);
        } else if (predefined && !added) {
          onAdd(word);
        }
      }}
      className={`cursor-pointer flex cursor-warning transition group items-center justify-center gap-2 text-black  ${
        added || !predefined
          ? "bg-green-500"
          : "bg-cyan-500/50 hover:bg-green-500/70"
      } w-36 py-2 rounded-lg`}
    >
      <p>{word}</p>
      {!predefined && (
        <PencilIcon className="hidden group-hover:flex h-5 w-5" />
      )}
    </div>
  );
}

function Word({ word, added, predefined, onClick, onAdd, onRemove }) {
  return (
    <div
      onClick={() => {
        if (predefined && added) {
          onRemove(word);
        } else if (predefined && !added) {
          onAdd(word);
        } else {
          onClick();
        }
      }}
      className={`cursor-pointer flex cursor-warning transition group items-center justify-center gap-2 text-black  ${
        added || !predefined
          ? "bg-green-500"
          : "bg-cyan-500/50 hover:bg-green-500/70"
      } w-36 py-2 rounded-lg`}
    >
      <p>{word}</p>
      {!predefined && <TrashIcon className="hidden group-hover:flex h-5 w-5" />}
    </div>
  );
}
