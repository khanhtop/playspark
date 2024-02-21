import { useRouter } from "next/router";
import { useState } from "react";
import UIButton from "../ui/button";
import { useAppContext } from "@/helpers/store";
import { groupRewards } from "@/helpers/rewards";

export default function PrizesCard({ data, inSlider }) {
  const router = useRouter();
  const context = useAppContext();

  return (
    <div
      className={`flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group ${
        inSlider && "min-w-[320px]"
      } h-[200px] shadow-lg hover:shadow-md ${
        data.primaryColor === "#000000" ? "shadow-[#333]/50" : "shadow-black/50"
      }`}
    >
      <div
        style={{
          //   backgroundImage: `url(${item.image})`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 flex flex-col p-2"
      >
        <div className="flex-1 p-4">
          <p>{groupRewards(context.prizes)?.length} Prizes Available</p>
          <p>Win prizes such as {context.prizes?.[0]?.name}</p>
        </div>
        <div className="flex justify-end w-full">
          <UIButton
            primaryColor={data.accentColor}
            textColor={data.primaryColor}
            text="See Prizes"
            className=""
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ text, value }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <p>{value}</p>
      <p className="opacity-50 text-sm">{text}</p>
    </div>
  );
}
