import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function DMHeader({ onBack, chatter }) {
  return (
    <div className="bg-white/10 h-12 flex px-4 items-center gap-2 text-lg rounded-lg justify-between">
      <p>Chatting With {chatter.companyName}</p>
      <XMarkIcon onClick={onBack} className="h-6 w-6 cursor-pointer" />
    </div>
  );
}
