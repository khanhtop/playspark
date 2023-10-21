export default function FilterPills({ options, selected, onSelect }) {
  return (
    <>
      <p className="pb-1 ml-1">Show</p>
      <div className="flex gap-4 pb-8">
        {options?.map((item, key) => (
          <div
            onClick={() => onSelect(item.value)}
            key={key}
            className={`px-4 py-2 rounded-full cursor-pointer bg-black text-white ${
              selected === item.value ? "opacity-100" : "opacity-30"
            }`}
          >
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
