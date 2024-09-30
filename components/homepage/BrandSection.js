import { PrismicRichText } from "@prismicio/react";
import Icon from "../../public/images/Icons (3).png";
import React from 'react'
import clsx from "clsx";
import Ticker from '../../public/images/Ticker_1.jpg'

export default function BrandSection({ page }) {
  return (
    <div>
       <div className="flex flex-col items-center justify-center  gap-5 text-black bg-white pt-10">
        <h1 className="text-[54px] font-bold ">{page.brand_title_1}</h1>
        <img src={Ticker.src} />
        <img src={Ticker.src} />
      </div>
      <div className="bg-gradient-to-t from-back to-white py-16 px-4 flex flex-col items-center justify-center  gap-5 text-black bg-white">
          <div className="shadow-sm shadow-grey border rounded-[10px] px-[105px]  pb-4">
            <h1 className="my-4 font-bold text-[54px]">{page.brand_title_2}</h1>
            <p className="text-[#6F6C90] text-[22px] w-[535px] mx-auto">
              {" "}
              {page.brand_text}
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-5">
            {page.brand_group?.map((item, key) => (
              <Blog item={item} key={key} />
            ))}
          </div>
        </div>

    </div>
   
  );
}

const Blog = ({ item }) => {
  
  let className

  const imagePositionClassName = React.useMemo(() => {
    if(item.image_position == null){
      console.log("1");
      className = "absolute right-[-50px]"
    }
    else if(item.image_position == "top-right") {
      console.log("2")
      className = "absolute top-0 right-0 "
    }

    else if(item.image_position == "bottom-right"){
      console.log("3")
      className = "absolute bottom-0 right-[-30px] "
    }
  }, [item.image_position])

  return (
    <div className="w-1/3 h-[610px] max-w-[351px] bg-white shadow-lg shadow-grey border rounded-[24px] flex flex-col  pt-10 px-10">
      <div className=" flex flex-col items-center justify-center ">
        <p className="text-[#6F6C90] text-[18px] font-bold">{item.text}</p>
        <div className="flex flex-row items-center justify-start w-full relative">
          <p className="text-[54px] font-bold text-start ">{item.title}</p>
          <img src={item.brand_logo.url} className={className} />
        </div>
        <button className="bg-black text-white w-[271px] py-2 px-4 my-7 rounded-lg">
          {item.button}
        </button>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 my-2 mx-2">
        <div className="flex flex-row items-start justify-start">
        {item.check_1 && <IconImage />}
          <p className="font-bold text-[14px] ">{item.check_1}</p>
        </div>
        <div className="flex flex-row items-start justify-start">
        {item.check_2 && <IconImage />}
          <p className="font-bold text-[14px] ">{item.check_2}</p>
        </div>
        <div className="flex flex-row items-start justify-start">
        {item.check_3 && <IconImage />}
          <p className="font-bold text-[14px] ">{item.check_3}</p>
        </div>
        <div className="flex flex-row items-start justify-start">
        {item.check_4 && <IconImage />}
          <p className="font-bold text-[14px] ">{item.check_4}</p>
        </div>
        <div className="flex flex-row items-start justify-start">
        {item.check_5 && <IconImage />}
          <p className="font-bold text-[14px] ">{item.check_5}</p>
        </div>
      </div>
    </div>
  );
};

const IconImage = () => {
    return (
        <img src={Icon.src} />
    )
}