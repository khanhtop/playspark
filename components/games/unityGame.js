import { tryGetGame } from "@/helpers/premiumGames";
import { useCallback, useEffect, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import BannerAd from "../advertising/bannerAd";

export default function UnityGame({ data, onLoad, onFinish, shouldPlay }) {
  const unloadRef = useRef();
  const {
    unityProvider,
    sendMessage,
    isLoaded,
    unload,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: `/premiumGames/${data.unityBundle}/Build/${data.unityBundle}.loader.js`,
    dataUrl: `/premiumGames/${data.unityBundle}/Build/${data.unityBundle}.data`,
    frameworkUrl: `/premiumGames/${data.unityBundle}/Build/${data.unityBundle}.framework.js`,
    codeUrl: `/premiumGames/${data.unityBundle}/Build/${data.unityBundle}.wasm`,
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
        gameType: data.unityGameType,
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

  return (
    <div className="h-full w-full">
      {shouldPlay && (
        <div className="w-full h-[90px] bg-black flex items-center justify-center">
          <BannerAd size="small" position="top" delay={250} />
        </div>
      )}
      <Unity className="w-full h-full" unityProvider={unityProvider} />;
    </div>
  );
}
