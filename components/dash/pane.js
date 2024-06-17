export default function Pane({ title, children }) {
  return (
    <div className="flex-1 pt-12 px-8 overflow-y-scroll">
      <h1 className="mb-8 font-bold text-black/60 text-2xl tracking-wide">
        {title}
      </h1>
      {children}
    </div>
  );
}
