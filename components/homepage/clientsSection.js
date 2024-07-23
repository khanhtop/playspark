import { Carousel } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ClientsSection({ clients }) {
  const router = useRouter();

  return (
    <div className="bg-[#000] pb-24">
      <div className="pb-0 pt-12">
        <h1 className="text-4xl font-bold">Our Clients</h1>
      </div>
      <Carousel className="h-[300px]">
        {clients?.map((item, key) => (
          <img src={item.image.url} className="h-full object-contain" />
        ))}
      </Carousel>
      <button
        onClick={() => router.push("/case-studies")}
        className="bg-lime-600 rounded-full mt-6 px-5 py-2 text-xl cursor-pointer"
      >
        See Case Studies
      </button>
    </div>
  );
}
