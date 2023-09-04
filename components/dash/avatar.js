export default function Avatar({ character }) {
  return (
    <div className="cursor-pointer absolute top-8 right-8 h-12 w-12 bg-cyan-400 rounded-full flex items-center justify-center">
      <h3 className="text-2xl text-black/50">{character}</h3>
    </div>
  );
}
