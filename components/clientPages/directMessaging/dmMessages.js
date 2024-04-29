import DMPost from "./dmPost";

export default function DMMessages({ chatter }) {
  return (
    <div className="flex-1 bg-white/40 rounded-xl flex flex-col">
      <div className="flex-1" />
      <DMPost />
    </div>
  );
}
