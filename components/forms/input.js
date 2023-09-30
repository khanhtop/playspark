export default function Input(props) {
  return (
    <div className="px-1">
      {props.label && (
        <p className={`text-xs ${props.labelColor ?? "text-black/70"} mb-1`}>
          {props.label}
        </p>
      )}
      <input
        {...props}
        className={`${props.className} px-4 py-1 rounded-md text-black`}
      />
    </div>
  );
}
