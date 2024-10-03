import { useMemo } from "react";
import Icon1 from "/public/images/social-icons/white/1.png"
import Icon2 from "/public/images/social-icons/white/2.png"
import Icon3 from "/public/images/social-icons/white/3.png"
import Icon4 from "/public/images/social-icons/white/4.png"
import Icon5 from "/public/images/social-icons/white/5.png"
import Icon6 from "/public/images/social-icons/white/6.png"



const Image_white = [
  Icon1, Icon2, Icon3, Icon4, Icon5, Icon6
]

import footer_logo from '/public/images/footer_logo.png'

export default function Footer() {

  return (
    <div className="px-5 pt-10  font-light bg-[#484A4A] text-white">
      <div className="w-full flex flex-col lg:flex-row justify-center  max-w-[1400px] lg:max-h-[238px] pb-10 px-5 ">
        <div className="w-1/2 flex flex-col items-start justify-between gap-6">
          <img
            src={footer_logo.src}
            className=" -mt-4 mx-1 bg-bal"
          />
          <p className=" text-[14px] max-w-[240px]">
            We level up your brand marketing with white-labelled arcade games
            and playable ads.
          </p>
          <div className="flex flex-row gap-3">
            {
              Image_white?.map((item, key)=> {
                return <img src = {item.src} key={key} className="w-4 h-4" />
              })
            }
          </div>
        </div>
        <div className="lg:w-1/2  w-full flex lg:flex-row-reverse flex-col-reverse  gap-12 items-start justify-start pr-5 pt-12 lg:pt-5  text-[14px]">
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2">
            <p className="font-bold ">Legal</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Security</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2">
            <p className="font-bold ">Resource</p>
            <p>Case Studies</p>
            <p>Docs</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2">
            <p className="font-bold ">company</p>
            <p>About</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2">
            <p className="font-bold ">Products</p>
            <p>Feature</p>
            <p>FAQ</p>
            <p>Pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
