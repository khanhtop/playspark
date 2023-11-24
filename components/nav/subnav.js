export default function SubNav({ options, selected, onSelect }) {
  return (
    <div className="w-full h-8 bg-black/50 rounded-lg overflow-hidden flex">
      {options?.map((item, key) => (
        <TabItem
          item={item}
          key={key}
          selected={selected === item.value}
          onSelect={(i) => onSelect(i)}
        />
      ))}
    </div>
  );
}

function TabItem({ item, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="flex-1 flex items-center justify-center h-full cursor-pointer"
    >
      <p
        className={`h-full w-full flex items-center justify-center text-sm ${
          selected ? "bg-cyan-400" : "bg-transparent text-[#AAA]"
        }`}
      >
        {item.text}
      </p>
    </div>
  );
}
