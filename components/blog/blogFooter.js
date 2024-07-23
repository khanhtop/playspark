import { LinkIcon } from "@heroicons/react/24/solid";
import React from "react";

const BlogFooter = () => {
  return (
    <div className="flex gap-[12px] mt-[24px]">
      <SocialIcon src="/images/social/2.png" alt="twitter" />
      <SocialIcon src="/images/social/1.png" alt="facebook" />
      <SocialIcon src="/images/social/4.png" alt="linkedin" />
    </div>
  );
};

const SocialIcon = ({ src, alt, text }) => (
  <div className="flex justify-center items-center border p-[10px] rounded-lg gap-[8px]">
    <img className="w-[20px] h-[20px]" src={src} alt={alt} />
    {text && (
      <h3 className="text-[#344054] text-[14px] font-medium leading-[20px]">
        {text}
      </h3>
    )}
  </div>
);

export default BlogFooter;
