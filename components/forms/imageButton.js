export default function ImageButton({ image, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:opacity-80 transition h-[80px] px-4 px-12 relative flex items-center justify-center"
    >
      <img className="absolute top-0 left-0 h-full w-full" src={image} />
      <p className="z-20 mt-1 text-lg">{text}</p>
    </div>
  );
}
