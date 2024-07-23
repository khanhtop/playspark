import { useRouter } from "next/router";

export default function ColsWithCTA({
  image,
  title,
  boldText,
  text,
  CTAUrl,
  bgColor,
}) {
  const router = useRouter();
  return (
    <div
      style={{ backgroundColor: bgColor || "#000e44" }}
      className="min-h-[900px] w-full bg-cover flex"
    >
      <div className="flex-1 flex flex-col pt-24 lg:flex-row text-white bg-cover px-8 pt-20 lg:gap-8 bg-black/0">
        <div className="flex flex-col lg:flex-1 items-center lg:items-start justify-center mb-12 lg:mb-0">
          <img src={image} className="max-h-[400px]" />
        </div>
        <div className="flex flex-col items-center lg:items-start justify-center flex-1 text-center lg:text-left gap-2">
          <h1 className="text-4xl xl:text-6xl font-bold max-w-[400px]">
            {title}
          </h1>
          <h1 className="text-xl xl:text-3xl font-light max-w-[500px] mt-4">
            {boldText}
          </h1>
          <h1 className="text-xl xl:text-3xl font-light max-w-[500px] mt-4">
            {text}
          </h1>
          <button
            onClick={() => router.push(CTAUrl)}
            className="bg-green-500 px-6 py-3 rounded-full mt-4 font-bold text-xl lg:text-2xl"
          >
            Book A Demo
          </button>
        </div>
      </div>
    </div>
  );
}
