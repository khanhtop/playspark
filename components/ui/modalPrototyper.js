import { useAppContext } from "@/helpers/store";
import { ModalButton, ModalText } from "./modalElements";

export default function ModalPrototyper() {
  const context = useAppContext();
  const showProto = () => {
    context.setModal({
      title: "You Win",
      contents: (
        <div className="flex flex-1 flex-col w-full h-full items-center">
          <div className="flex-1 w-full max-h-[60%] flex justify-center">
            <img
              src="/branding/treasure.png"
              className="object-contain h-full"
            />
          </div>

          <div className="w-full flex-1 flex flex-col gap-0 items-center">
            <ModalText>1 x Revive</ModalText>
            <ModalText>+ Last Score Reviver</ModalText>
            <ModalButton
              onClick={() => {
                context.setModal();
                // context.setHasSeenVideo(true);
                // onSkip();
              }}
              text="Claim"
            />
          </div>
        </div>
      ),
    });
  };
  return <button onClick={() => showProto()}>Prototype</button>;
}
