import { platforms } from "@/helpers/platforms";
import { useState, useEffect } from "react";
import GameAnalytics from "./gameAnalytics";

export default function AnalyticsModal({ item, setShowAnalytics }) {
  return (
    <div
      onClick={() => setShowAnalytics()}
      className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-white rounded-lg px-4 py-4 w-[90%] max-w-[700px] bg-[#000] border-cyan-400 border-2 flex flex-col items-start justify-center"
      >
        <h1 className="text-xl mb-4">Tournament Analytics</h1>
        <GameAnalytics item={item} />
      </div>
    </div>
  );
}
