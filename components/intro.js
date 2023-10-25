import ColoredButton from "@/components/forms/colors";
import BannerAd from "./advertising/bannerAd";
import UIButton from "./ui/button";
import Text from "./ui/text";

export default function Intro({ data, setStage, premium, ready }) {
  return (
    <div
      style={{ width: "100%" }}
      className={`h-full w-full ${
        premium ? "absolute top-0 left-0" : "relative"
      }`}
    >
      {/* <BannerAd size="small" position="top" delay={1000} /> */}
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="text-white items-center justify-end absolute top-0 left-0 h-full w-full  flex flex-col p-8">
        <Text
          {...data}
          style={{
            color: data?.textColor,
            fontSize: 24,
          }}
          className="font-light animate-pulse mb-4 px-2 py-1 rounded-lg"
        >
          {data?.name}
        </Text>
        {(!premium || ready) && (
          <UIButton {...data} onClick={() => setStage(1)} text="START" />
        )}
      </div>
    </div>
  );
}
