import { XMarkIcon } from "@heroicons/react/24/solid";

export default function GlassModal({ showWhen, onClose, children }) {
  if (!showWhen) return <div />;
  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
      <div className="h-[90%] w-[90%] bg-black/50 backdrop-blur z-30 rounded-3xl relative">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 h-12 w-12 bg-black/50 hover:bg-black/70 transition border-2 border-white/10 rounded-full p-1"
        >
          <XMarkIcon />
        </div>
      </div>
    </div>
  );
}
