import { useMemo } from "react";
import Icon1 from "/public/images/social-icons/white/1.png"
import Icon2 from "/public/images/social-icons/white/2.png"
import Icon3 from "/public/images/social-icons/white/3.png"
import Icon4 from "/public/images/social-icons/white/4.png"
import Icon5 from "/public/images/social-icons/white/5.png"
import Icon6 from "/public/images/social-icons/white/6.png"

//black
import Icon_1 from "/public/images/social-icons/black/Vector (2).png"
import Icon_2 from "/public/images/social-icons/black/Socials (6).png"
import Icon_3 from "/public/images/social-icons/black/Socials (7).png"
import Icon_4 from "/public/images/social-icons/black/Socials (8).png"
import Icon_5 from "/public/images/social-icons/black/Socials (9).png"
import Icon_6 from "/public/images/social-icons/black/Socials (10).png"

import clsx from 'clsx'

const Image_white = [
  Icon1, Icon2, Icon3, Icon4, Icon5, Icon6
]
const Image_black = [
  Icon_1 , Icon_2, Icon_3, Icon_4, Icon_5, Icon_6
]


export default function Footer({page, bg}) {
  let bgColor;
  let socialImages
  useMemo(()=>{
    if(bg == "1"){
      bgColor = "bg-[#484A4A] text-white"
      socialImages = Image_white;
    }
    else{
      bgColor = "bg-gradient-to-r from-liner to-white text-black"
      socialImages = Image_black
    }
  },[bg])
  return (
    <div className={clsx("px-5 pt-10 flex justify-center font-light", bgColor)} >
      <div className="w-full max-w-[1400px] max-h-[238px] pb-10 px-5 flex flex-row">
        <div className="w-1/2 flex flex-col items-start justify-between">
          <img
            src={page.footer_logo.url}
            className="max-h-11  -mt-4 mb-1 mx-1 bg-bal"
          />
          <p className=" text-[14px] max-w-[240px]">
            We level up your brand marketing with white-labelled arcade games
            and playable ads.
          </p>
          <div className="flex flex-row gap-3">
            {
              socialImages?.map((item, key)=> {
                return <img src = {item.src} key={key} className="w-4 h-4" />
              })
            }
          </div>
        </div>
        <div className="w-1/2 flex flex-row-reverse gap-12 items-start justify-start pr-5  pt-5  text-[14px]">
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">Legal</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Security</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">Resource</p>
            <p>Case Studies</p>
            <p>Docs</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">company</p>
            <p>About</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
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
