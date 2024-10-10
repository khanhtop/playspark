import { PrismicRichText } from "@prismicio/react";
import Icon from "../../public/images/Icons (3).png";
import React from "react";
import clsx from "clsx";
import Ticker from "../../public/images/logos.png";
import { useRouter } from "next/router";

export default function BrandSection({ page }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col items-center justify-center  gap-10 text-black bg-white pt-[75px]">
        <h1 className="lg:text-[54px] text-[48px] font-bold max-w-[348px] lg:max-w-full leading-[60px] mx-auto font-roboto -tracking-wide">
          {page.brand_title_1}
        </h1>
        <img
          src={Ticker.src}
          className="max-w-full lg:max-w-[774px] mx-auto lg:h-[200px] h-[100px]"
        />
        <button
          className="bg-free w-[241px] text-black rounded-[30px] py-3 px-3 "
          onClick={() => router.push("/case-studies")}
        >
          See Case Studies
        </button>
      </div>
      <div className="bg-gradient-to-t from-back to-white py-16 px-4 flex flex-col items-center justify-center gap-5 text-black bg-white">
        <div className="lg:shadow-sm lg:shadow-grey lg:border  lg:rounded-[10px] lg:px-[105px] pb-4 ">
          <h1 className="my-4 font-bold text-[54px] leading-[60px] font-roboto -tracking-wide">
            {page.brand_title_2}
          </h1>
          <p className="text-subtitle text-[22px] lg:w-[535px] mx-auto">
            {" "}
            {page.brand_text}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
          {page.brand_group?.map((item, key) => (
            <Blog item={item} key={key} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Blog = ({ item, key, page }) => {
  const router = useRouter();
  let className;
  let buttonColor;
  let textList;
  let topMargin;
  const imagePositionClassName = React.useMemo(() => {
    if (item.image_position == null) {
      className = "absolute right-[-30px] w-32  ";
      buttonColor = "bg-black text-white ";
      topMargin = "py-11";
      textList = page.first_list;
    } else if (item.image_position == "top-right") {
      className = "absolute bottom-12 right-0   w-20";
      buttonColor = "bg-free text-black";
      topMargin = "pt-0";
      textList = page.second_list;
    } else if (item.image_position == "bottom-right") {
      className = "absolute top-12   right-[-25px] w-20";
      buttonColor = "bg-black text-white ";
      topMargin = "pt-0";
      textList = page.last_list;
    }
  }, [item.image_position]);

  return (
    <div className="lg:w-1/3 w-full h-[610px] max-w-[351px] bg-white shadow-lg shadow-grey border rounded-[24px] flex flex-col  pt-10 px-10">
      <div className=" flex flex-col items-center justify-center ">
        <p className="text-[#6F6C90] text-[18px] font-bold font-roboto ">
          {item.text}
        </p>
        <div
          className={clsx(
            "flex flex-row items-center justify-start w-full relative",
            topMargin
          )}
        >
          <p className="text-[54px] font-bold text-start leading-[60px] font-roboto -tracking-widest">
            {item.title}
          </p>
          <img src={item.brand_logo.url} className={className} />
        </div>
        <button
          className={clsx(
            " w-[271px] py-2 px-4 my-7 rounded-[30px]",
            buttonColor
          )}
          onClick={() => router.push("/case-studies")}
        >
          {item.button}
        </button>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 my-2 mx-2">
        {textList?.map((item, key) => {
          return (
            <div className="flex flex-row items-start justify-start" key={key}>
              <IconImage />
              <div className="flex flex-col justify-center items-start">
                <p className="font-bold text-[14px] ">{item.maintext}</p>
                <p className="text-[14px]">{item.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IconImage = () => {
  return <img src={Icon.src} />;
};
