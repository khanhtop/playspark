import { ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { configurableParameterTitles } from "@/helpers/configurability";

export default function CreateGlbPicker({
  aspectRatio,
  title,
  selected,
  dimension,
  updateSprite,
  gameTag,
  pickerZoom,
}) {
  const [stateImages, setStateImages] = useState();

  useEffect(() => {
    if (!stateImages) {
      fetch(`/api/cloudinaryGet?aspectRatio=${aspectRatio}&gameTag=${gameTag}`)
        .then((raw) => {
          return raw.json();
        })
        .then((json) => {
          setStateImages(json);
        });
    }
  }, []);

  return (
    <>
      <div className="text-white/70 mb-3 mt-2 text-sm flex gap-2">
        <h1 className="">
          {configurableParameterTitles?.[gameTag]?.[dimension]?.text ?? title}
        </h1>
        <Tag text={gameTag} />
        <Tag text={aspectRatio} />
      </div>

      <div className="flex gap-2 ">
        <div className="h-48 rounded-xl bg-white/10 overflow-hidden ">
          <div className="h-[15%] flex items-center pl-2 bg-black/20 text-white/50 text-xs">
            <p>Current</p>
          </div>
          <div className="h-[85%] py-2 px-2 ">
            <BabylonModel
              modelUrl={selected}
              onSelect={() => null}
              pickerZoom={pickerZoom}
            />
          </div>
        </div>

        <div className="flex-1 h-48 rounded-xl w-full bg-white/10  whitespace-no-wrap">
          <div className="h-[15%] text-xs flex items-center pl-2 bg-black/20 text-white/50">
            <p>Library</p>
          </div>
          <div className="flex h-[85%] gap-2 py-2 px-2 overflow-x-scroll">
            {stateImages?.map((item, key) => (
              <BabylonModel
                modelUrl={item.secure_url}
                key={key.toString() + item.secure_url}
                onSelect={() => updateSprite(item.secure_url)}
                pickerZoom={pickerZoom}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Tag({ text }) {
  return (
    <div className="bg-cyan-400 text-black px-4 rounded-full ">
      <p>{text}</p>
    </div>
  );
}

export function BabylonModel({ modelUrl, selected, onSelect, pickerZoom }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    engineRef.current = engine;

    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      pickerZoom,
      new Vector3(0, 0, 0),
      scene
    );
    camera.minZ = 0.01;
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMesh("", modelUrl, "", scene, (meshes) => {
      scene.createDefaultEnvironment();
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [modelUrl]);

  return (
    <div
      onClick={() => {
        onSelect(modelUrl);
      }}
      className={`flex-1 h-full flex-shrink-0 rounded-lg overflow-hidden border-2 ${
        selected ? "border-white" : "border-transparent cursor-pointer"
      }`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      />
    </div>
  );
}
