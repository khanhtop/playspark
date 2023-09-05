export default function Pong({ data }) {
  return (
    <div
      style={{ backgroundColor: data?.primaryColor, color: data?.textColor }}
      className={`h-full w-full`}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-white/20 flex items-center justify-center">
        <p>Branding Banner Goes Here</p>
      </div>
      {/* Game Goes Here */}
    </div>
  );
}
