export default function AreaPills({ options, onClick, selected, user }) {
  return (
    <div className="flex font-octo gap-4">
      {options.map((item, key) => (
        <Tab
          accent={user.accentColor}
          primary={user.primaryColor}
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

function Tab({ item, selected, accent, normal, onClick, primary }) {
  return (
    <div
      onClick={onClick}
      style={{
        color: selected ? primary : normal,
        borderColor: selected ? accent : "transparent",
        backgroundColor: selected ? accent : "transparent",
      }}
      className="cursor-pointer transition rounded-full border-4 h-12 md:h-16 md:text-2xl flex-1 flex items-center justify-center"
    >
      <p>{item.text}</p>
    </div>
  );
}
