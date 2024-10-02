"use client";

import { Carousel } from "flowbite-react";
import { PrismicRichText } from "@prismicio/react";
import selectImage from "../../public/images/select.png"

export default function Slider({items}) {
  return (
    <div className="flex items-center justify-center bg-white text-black px-10 py-10">
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
      <div className="mx-auto max-w-[1000px] h-[800px] lg:h-[700px] " >
        <div className=" flex flex-col-reverse lg:flex-row gap-5  shadow-xl shadow-grey border rounded-[10px] py-10 px-10 h-full">
          <div className="lg:w-1/2  w-full flex flex-col gap-10 items-center justify-center  ">
            <h1 className=" font-bold text-2xl px-10">{item.title}</h1>
            <div className=" flex flex-col gap-8 text-start text-[16px] px-3">
              <div className=" flex flex-row gap-1 justify-center items-center"> 
                  {item.text_1[0] && <SelectImg />}
                <PrismicRichText field={item.text_1} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center"> 
              {item.text_2[0] && <SelectImg />}
                <PrismicRichText field={item.text_2} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center"> 
                {item.text_3[0] && <SelectImg />}
                <PrismicRichText field={item.text_3} />
              </div>
            </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img src = {item.image.url} className="w-[250px] h-[250px] lg:w-[333px] lg:h-[333px] " />
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