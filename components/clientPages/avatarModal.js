import { XMarkIcon } from "@heroicons/react/24/solid";

export default function AvatarModal({
  show,
  close,
  avatars,
  currentAvatar,
  onSelect,
}) {
  if (!show) return <div />;
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-20 backdrop-blur flex items-center justify-center px-4 py-8">
      <div className="h-full w-full bg-white max-w-[600px] max-h-[800px] flex flex-col">
        <div className="h-12 flex-shrink-0 bg-black text-white flex items-center px-4 justify-between">
          <p>Change My Avatar</p>
          <XMarkIcon onClick={close} className="h-5 cursor-pointer" />
        </div>
        <div className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 overflow-y-scroll px-2 py-2">
          {avatars?.map((item, key) => (
            <AvatarBox
              avatar={item}
              key={key}
              selected={item === currentAvatar}
              onSelect={() => onSelect(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AvatarBox({ avatar, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`flex-1 aspect-square border-8 rounded-lg ${
        selected
          ? "border-green-500 opacity-100"
          : "border-transparent opacity-50"
      }`}
    >
      <img src={avatar} />
    </div>
  );
}
