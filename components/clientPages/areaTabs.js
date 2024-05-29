export default function AreaTabs({ options, onClick, selected, user }) {
  return (
    <div className="flex font-octo bg-black/10">
      {options.map((item, key) => (
        <Tab
          accent={user.accentColor}
          normal={user.textColor}
          item={item}
          key={key}
          selected={item.value === selected}
          onClick={() => onClick(item)}
        />
      ))}
    </div>
  );
}

function Tab({ item, selected, accent, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        color: selected ? accent : "",
        borderBottomColor: selected ? accent : "transparent",
      }}
      className="cursor-pointer transition border-b-4 h-12 md:h-16 text-lg md:text-xl flex-1 flex items-center justify-center"
    >
      <p>{item.text}</p>
    </div>
  );
}
