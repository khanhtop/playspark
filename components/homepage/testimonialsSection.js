import { Carousel } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TestimonialsSection({ title, testimonials }) {
  const router = useRouter();

  return (
    <div className="bg-blue-950 pb-12 text-white">
      <div className="pb-0 pt-12">
        <h1 className="text-4xl font-bold mb-8 text-white/90">
          {title || "Client Testimonials"}
        </h1>
      </div>
      <Carousel className="h-[320px]">
        {testimonials?.map((item, key) => (
          <div className="w-full h-full flex items-center justify-center px-24 pb-16 pt-8">
            <div className="h-full w-full bg-black/30 pt-12 rounded-3xl">
              <img
                src={item.image.url}
                style={{ top: -0 }}
                className="absolute h-16 w-16 left-[calc(50%-36px)] rounded-full border-2 border-black/30"
              />
              <h1 className="text-xl">{item.name}</h1>
              <p className="opacity-50">{item.position}</p>
              <p className="mt-2 px-4 line-clamp-4">{item.text}</p>
            </div>
          </div>
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
