import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ModalSkin({ title, children, onClose, narrow }) {
  return (
    <div
      onClick={onClose}
      className="h-screen w-screen bg-black/90 top-0 left-0 fixed flex items-center justify-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-[80%] ${
          narrow ? "w-[400px]" : "w-[90%]"
        } bg-white rounded-2xl flex flex-col`}
      >
        <div className="h-16 border-b-2 border-b-black/10 flex justify-between items-center px-4">
          <h3 className="text-xl">{title}</h3>
          <XMarkIcon className="h-8 cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-scroll px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
