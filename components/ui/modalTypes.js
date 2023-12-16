import { ModalButton, ModalText } from "./modalElements";

export function WinModal({ data, onClaim }) {
  return (
    <div
      className={`flex flex-1 ${
        data?.landscape ? "flex-row" : "flex-col"
      } w-full h-full items-center`}
    >
      <div className="flex-1 w-full max-h-[160px] flex justify-center">
        <img src="/branding/treasure.png" className="object-contain" />
      </div>

      <div className="w-full flex-1 flex flex-col gap-0 items-center">
        <ModalText>1 x Revive</ModalText>
        <ModalText>+ Last Score Reviver</ModalText>
        <ModalButton onClick={onClaim} text="Claim" />
      </div>
    </div>
  );
}
