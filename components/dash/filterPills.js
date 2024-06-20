export default function FilterPills({ options, selected, onSelect }) {
  return (
    <div className="flex flex-col items-start font-roboto">
      <div className="flex mb-8 rounded-full overflow-hidden bg-white">
        {options?.map((item, key) => (
          <div
            onClick={() => onSelect(item.value)}
            key={key}
            className={`w-24 flex items-center justify-center py-2  cursor-pointer ${
              selected === item.value
                ? "bg-indigo-700 text-white"
                : "bg-white/10 text-black hover:bg-indigo-700 hover:text-white transition"
            }`}
          >
            <p className="text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
