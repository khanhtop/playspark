import backImg from "../../public/images/logos.png";

export default function WhatWeDo({ page }) {
  return (
    <div className="w-full  text-black flex flex-col items-center justify-center ">
      <div className="bg-white flex flex-col items-center justify-center w-full gap-5">
        <img
          src={backImg.src}
          className="max-w-full lg:max-w-[774px] mx-auto lg:h-[166px] h-[100px] my-3"
        />
        <h1 className=" text-5xl lg:text-6xl font-bold text-black  max-w-[400px] lg:max-w-[590px] lg:mt-22 leading-[60px] font-roboto -tracking-wider  ">
          {page.what_we_do_title}
        </h1>
        <div className="flex flex-col gap-0 text-center text-xl font-light mx-auto max-w-[373px] lg:max-w-[668px] lg:px-10 text-black">
          <p className="text-center text-[22px] font-light mx-auto max-w-[373px] lg:max-w-[668px]  text-subtitle">
            {page.what_we_do_text}
          </p>
          <p className="text-center text-[22px] font-light mx-auto max-w-[373px] lg:max-w-[668px] text-subtitle">
            {page.what_we_do_text_1}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-t from-back to-white w-full flex flex-col  items-center justify-center pb-12 ">
        <div className="flex lg:flex-row flex-col gap-10 lg:gap-4 m-8 ">
          {page.what_we_do_items?.map((item, key) => (
            <Element item={item} key={key} />
          ))}
        </div>
        <button className="px-8 py-4 flex items-center justify-center text-center font-medium text-[16px] text-black bg-free rounded-[30px]">
          See How It Works{" "}
        </button>
      </div>
    </div>
  );
}

function Element({ item }) {
  return (
    <div className="flex-1 flex flex-col gap-4 lg:gap-2 items-center px-8  py-4  w-full lg:w-1/3">
      <img src={item.image.url} className="w-auto " />
      <div className="flex flex-col items-start gap-[10px] justify-start mt-10 lg:mt-[74px] max-w-[260px] mx-auto">
        <img src={item.log.url} className="w-auto" />
        <h3 className="font-bold text-[18px] text-left">{item.title}</h3>
        <h3 className="text-[16px] text-left"> {item.text}</h3>
      </div>
    </div>
  );
}
