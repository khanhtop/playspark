export default function ColoredButton({ style, className, src }) {
  return (
    <div style={style} className={`${className} relative overflow-hidden`}>
      <img src={src} className="h-full w-full grayscale object-fill" />
      <div
        className="mt-1 mb-1 absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: "#FF0000", opacity: 0.5 }}
      >
        {/* Content inside the overlay (optional) */}
      </div>
    </div>
  );
}
