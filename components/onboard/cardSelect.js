export default function CardSelect({ options, selected, setSelected }) {
  return (
    <div className="flex h-36 gap-4">
      {options.map((item, key) => (
        <div
          onClick={() => setSelected(key)}
          className={`flex flex-1 h-full flex-col ${
            selected === key
              ? "bg-cyan-300 text-black"
              : "bg-white/10 hover:bg-white/20"
          }   p-4 items-center justify-center rounded-lg cursor-pointer`}
        >
          <div className="h-12 w-full flex mb-3 justify-center">
            {item.icon}
          </div>
          <p className="text-center text-xs h-12">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
