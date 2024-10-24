"use client";

import { Carousel } from "flowbite-react";
import { PrismicRichText } from "@prismicio/react";
import selectImage from "../../public/images/select.png"

export default function Slider({items}) {
  return (
    <div className="flex w-full  items-center justify-center bg-white text-black px-2 py-2">
      <Carousel>
        {items?.map((item, key)=>{
            return <Blog item={item} key={key} />
        })}
      </Carousel>
    </div>
  );
}

const Blog = ({item}) => {
    return (
      <div className="mx-auto w-full h-[800px] " >
        <div className=" flex flex-col-reverse gap-5 items-center justify-center shadow-xl shadow-grey border rounded-[10px]  px-5 h-full">
          <div className="w-full flex flex-col gap-5 items-center justify-center  ">
            <h1 className=" font-bold text-[26px] px-10">{item.title}</h1>
            <div className=" flex flex-col gap-3 text-start justify-start items-start text-[16px] px-3">
              <div className=" flex flex-row gap-1 justify-center items-center text-[16px]"> 
                  {item.text_1[0] && <SelectImg />}
                <PrismicRichText field={item.text_1} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center text-[16px]"> 
              {item.text_2[0] && <SelectImg />}
                <PrismicRichText field={item.text_2} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center text-[16px]"> 
                {item.text_3[0] && <SelectImg />}
                <PrismicRichText field={item.text_3} />
              </div>
            </div>
        </div>
        <div className="w-full flex items-end justify-center">
            <img src = {item.image.url} className="w-[260px] h-[244px] " />
        </div>
        </div>
        
      </div>
    )
  }
  
const SelectImg = () => {
    return(
      <img src={selectImage.src}/>
    ) 
  }