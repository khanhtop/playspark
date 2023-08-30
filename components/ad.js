import Intro from "./intro";

export default function Advert({ data }) {
  return (
    <div className="h-full w-full">
      <Intro data={data} />
    </div>
  );
}
