import { useEffect, useRef } from "react";
import { ModalButton, ModalText } from "./modalElements";

export function WinModal({ data, onClaim }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <div
      className={`flex flex-1 ${
        data?.landscape ? "flex-row" : "flex-col"
      } w-full h-full items-center `}
    >
      <audio ref={audioRef} src="/branding/fanfare.mp3" />
      <div className="flex-1 w-full max-h-[160px] flex justify-center">
        <img src="/branding/chest.png" className="object-contain" />
      </div>

      <div className="w-full flex-1 flex flex-col gap-0 items-center">
        <ModalText data={data}>1 x Revive</ModalText>
        <ModalText data={data}>+ Last Score Reviver</ModalText>
        <ModalButton data={data} onClick={onClaim} text="Claim" />
      </div>
    </div>
  );
}
