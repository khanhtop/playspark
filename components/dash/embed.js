import { platforms } from "@/helpers/platforms";
import { useState, useEffect } from "react";

export default function Embed({ setShowEmbed, id, onClick, link, setLink }) {
  const [platform, setPlatform] = useState(platforms[0]);
  const [embedCode, setEmbedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
    if (platform.value != "email") {
      setEmbedCode(
        `<iframe src="https://playspark.co/ad/` +
          id +
          ` class="h-[663px] w-[375px]"/>`
      );
    } else {
      setEmbedCode(`https://playspark.co/ad/` + id);
    }
  }, [platform]);

  function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
  }

  return (
    <div
      onClick={() => setShowEmbed()}
      className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-white rounded-lg px-4 py-4 w-[90%] max-w-[700px] bg-[#000] border-cyan-400 border-2 flex flex-col items-start justify-center"
      >
        <h1 className="text-xl">Embed Your Game</h1>
        <PlatformSwitcher
          platforms={platforms}
          platform={platform}
          setPlatform={setPlatform}
        />
        <div className="border-cyan-400 border-2 rounded-lg  h-36 flex w-full overflow-hidden">
          <pre className="bg-transparent flex-1 text-lg px-4 py-4 whitespace-pre-wrap">
            {embedCode}
          </pre>
          <button
            onClick={() => copyToClipboard(embedCode)}
            className="w-24 bg-white/10"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlatformSwitcher({ platform, setPlatform }) {
  return (
    <>
      <div className="flex gap-4 mt-4 flex-wrap">
        {platforms.map((item, key) => (
          <div
            onClick={() => setPlatform(item)}
            key={key}
            className={`${
              platform.value === item.value
                ? "bg-cyan-400"
                : "bg-[#222] hover:bg-cyan-400/50"
            } cursor-pointer h-12 basis-[150px] flex flex-1 items-center justify-center rounded-full gap-2 py-2 transition`}
          >
            <img src={item.logo} className="h-full" />
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
      <p className="py-4 px-2 text-sm h-48">{platform.text}</p>
    </>
  );
}
