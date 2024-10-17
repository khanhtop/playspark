import { Carousel } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

export default function PowerSection({ page }) {
  const router = useRouter();

  return (
    <div className="w-full  text-black pt-16 pb-16 px-4 bg-[#F7F7F7]">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <button className="text-center text-[13px] rounded-[10px] border border-black border-1 px-3 py-1 mt-24 ">
          {page.power_button_1}
        </button>
        <h1 className="text-6xl font-bold text-black -tracking-[3px] font-roboto">
          {page.power_title}
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 mt-8  ">
          {page.power_group?.map((item, key) => (
            <Element item={item} key={key} />
          ))}
        </div>
        <button
          className="bg-free w-[241px] text-black rounded-[30px] py-3 px-3 "
          onClick={() => router.push("/admin")}
        >
          {page.power_button_2}
        </button>
      </div>
    </div>
  );
}

function Element({ item }) {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center px-8 py-4 w-full lg:w-1/3">
      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start text-center  gap-5">
        <img src={item.image.url} className="w-48 h-48" />
        <h3 className="font-bold text-[24px] lg:whitespace-nowrap  ">
          {item.title}
        </h3>
        <div className="max-w-[260px] text-start ">
          <PrismicRichText field={item.text} />
        </div>
      </div>
    </div>
  );
}
