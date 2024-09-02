export default function Pane({ title, subtext, children }) {
  return (
    <div className="flex-1 pt-12 px-8 flex flex-col">
      <div className="pb-4 border-b-white/100 border-b-2 mb-4">
        <h1 className="font-bold text-blue-950 text-2xl tracking-wide">
          {title}
        </h1>
        <p className="text-black/50">{subtext}</p>
      </div>
      <div className="flex-1 overflow-y-scroll">{children}</div>
    </div>
  );
}
