export default function Input(props) {
  return (
    <div className={props.containerClassName}>
      {props.label && (
        <div className="flex items-center  mb-1">
          <p className={`text-xs ${props.labelColor ?? "text-black/70"}`}>
            {props.label}
          </p>
          {props.withActionButton && (
            <button
              onClick={() => props.withActionButton.action()}
              className="border-red-500 border-[1px] rounded-md text-xs px-4 text-red-500 ml-2 hover:bg-red-500 hover:text-white transition"
            >
              {props.withActionButton.text}
            </button>
          )}
        </div>
      )}
      <input
        {...props}
        className={`${props.className} px-4 py-1 rounded-md text-black`}
      />
    </div>
  );
}
