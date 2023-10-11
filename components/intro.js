import ColoredButton from "@/components/forms/colors";
import BannerAd from "./advertising/bannerAd";

export default function Intro({ data, setStage }) {
  return (
    <div className="h-full w-full relative">
      <BannerAd size="small" position="top" delay={1000} />
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="text-white items-center justify-end absolute top-0 left-0 h-full w-full  flex flex-col p-8">
        <h1
          style={{
            // backgroundColor: data?.primaryColor,
            color: data?.textColor,
            // borderWidth: 3,
          }}
          className="font-titan font-light animate-pulse text-2xl mb-4 px-2 py-1 rounded-lg"
        >
          {data?.name}
        </h1>
        <button
          onClick={() => setStage(1)}
          style={{
            // backgroundColor: data?.primaryColor,
            // borderColor: data?.textColor,
            // borderWidth: 3,
            color: data?.textColor,
          }}
          className="font-titan  font-light h-[65px] w-[160px] rounded-full hover:scale-105 transition"
        >
          <div className="h-full w-full flex items-center justify-center relative">
            <img
              src="/ui/button-blue.png"
              className="absolute top-0 left-0 h-full w-full"
            />
            <p className="z-10 text-2xl">Start</p>
          </div>
        </button>
      </div>
    </div>
  );
}
