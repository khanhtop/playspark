export default function FilterPills({ options, selected, onSelect }) {
  return (
    <div className="flex flex-col items-start font-roboto">
      <div className="flex mb-8 rounded-lg overflow-hidden">
        {options?.map((item, key) => (
          <div
            onClick={() => onSelect(item.value)}
            key={key}
            className={`w-24 flex items-center justify-center py-2  cursor-pointer ${
              selected === item.value
                ? "bg-cyan-400 text-black"
                : "bg-white/10 text-white hover:bg-cyan-400/50 transition"
            }`}
          >
            <p className="text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
