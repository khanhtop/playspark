export default function DMPost({}) {
  return (
    <div className=" px-2 py-2">
      <div className="bg-white border-cyan-500 border-2 h-12 rounded-full overflow-hidden flex">
        <input
          className="flex-1 text-black/80 px-4 outline-none text-sm"
          placeholder="Enter Message..."
        />
        <div className="flex py-1 px-2">
          <button className="bg-cyan-500 rounded-full px-4">Post</button>
        </div>
      </div>
    </div>
  );
}
