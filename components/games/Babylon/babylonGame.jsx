import dynamic from "next/dynamic";
import React, { ReactNode, useRef } from "react";

export default function BabylonGame({
  gameComponent,
  data,
  callback,
  gameType,
  params,
}) {
  const canvasRef = useRef();
  const containerRef = useRef();

  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: "black",
        color: data?.textColor,
        width: "100%",
        height: "100%",
      }}
    >
      <canvas className="h-full w-full" ref={canvasRef} />

      {canvasRef.current &&
        React.cloneElement(gameComponent, {
          data,
          callback,
          gameType,
          params,
          canvasRef,
          containerRef,
        })}
    </div>
  );
}
