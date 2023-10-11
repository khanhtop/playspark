import { largeBanners, smallBanners } from "@/helpers/mocks";
import { useState, useEffect } from "react";

export default function BannerAd({
  size = "large",
  position = "top",
  delay = 1000,
}) {
  const [offset, setOffset] = useState(0);

  const style = {
    position: "absolute",
    width: "100%",
    height: size === "large" ? 190 : 90,
    backgroundColor: "black",
    zIndex: 99,
  };

  useEffect(() => {
    setOffset(-style.height - 50);
    setTimeout(() => {
      setOffset(0);
    }, delay);
  }, []);

  const getBanner = () => {
    if (size === "small") {
      return smallBanners[Math.floor(Math.random() * smallBanners.length)];
    } else {
      return largeBanners[Math.floor(Math.random() * largeBanners.length)];
    }
  };

  const ad = getBanner();

  return (
    <div
      onClick={() => window.open(ad?.url)}
      style={{
        ...style,
        ...(offset === 0 && { transition: "1s all" }),
        ...(position === "top" && { top: offset, left: 0 }),
        ...(position === "bottom" && { bottom: offset, left: 0 }),
      }}
      className="animate-pulse cursor-pointer"
    >
      <img src={ad?.image} />
    </div>
  );
}
