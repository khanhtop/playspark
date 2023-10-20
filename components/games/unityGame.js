import { tryGetGame } from "@/helpers/premiumGames";
import { useCallback, useEffect, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame({ data, onLoad, onFinish }) {
  const unloadRef = useRef();
  const {
    unityProvider,
    sendMessage,
    isLoaded,
    unload,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: `/premiumGames/${tryGetGame(data.id - 1000)?.bundle}/Build/${
      tryGetGame(data.id - 1000)?.bundle
    }.loader.js`,
    dataUrl: `/premiumGames/${tryGetGame(data.id - 1000)?.bundle}/Build/${
      tryGetGame(data.id - 1000)?.bundle
    }.data`,
    frameworkUrl: `/premiumGames/${tryGetGame(data.id - 1000)?.bundle}/Build/${
      tryGetGame(data.id - 1000)?.bundle
    }.framework.js`,
    codeUrl: `/premiumGames/${tryGetGame(data.id - 1000)?.bundle}/Build/${
      tryGetGame(data.id - 1000)?.bundle
    }.wasm`,
  });

  useEffect(() => {
    if (unload) unloadRef.current = unload;
  }, [unload]);

  const handleGameOver = useCallback(
    async (userId, score, power, coins, revives) => {
      await unloadRef.current();
      onFinish(score);
    },
    []
  );

  useEffect(() => {
    if (!isLoaded) return;
    sendMessage(
      "ReactController",
      "LoadParameter",
      JSON.stringify({
        gameType: 0,
        backgroundColor: data.primaryColor,
        textColor: data.textColor,
        accentColor: "#000000",
        lifeCount: 1,
        power: 0,
        coins: 0,
      })
    );
    onLoad();
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [isLoaded]);

  return <Unity className="w-full h-full" unityProvider={unityProvider} />;
}
