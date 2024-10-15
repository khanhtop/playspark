import { useMemo } from "react";
import Twitter from "/public/images/social-icons/white/1.png"
import Instergram from "/public/images/social-icons/white/2.png"
import Pinterest from "/public/images/social-icons/white/3.png"
import Linkdin from "/public/images/social-icons/white/4.png"
import TikTok from "/public/images/social-icons/white/5.png"
import Youtub from "/public/images/social-icons/white/6.png"
import { useRouter } from "next/router";


const Image_white = [
  {
    icon:Twitter,
    url : ""
  },
  {
    icon : Instergram,
    url : "https://www.instagram.com/playspark.co"
  },
  {
    icon : Pinterest,
    url : " "
  },
  {
    icon : Linkdin,
    url : "https://www.linkedin.com/company/playspark/"
  },
  {
    icon : TikTok,
    url : ""
  },
  {
    icon : Youtub,
    url: ""
  }
]

import footer_logo from '/public/images/footer_logo.png'

export default function Footer() {
const router= useRouter();
  return (
    <div className="px-5 pt-10  font-light bg-[#484A4A] text-white">
      <div className="w-full flex flex-col lg:flex-row justify-center   lg:max-h-[238px] pb-10 px-5 ">
        <div className="w-1/2 flex flex-col items-start justify-between gap-6">
          <img
            src={footer_logo.src}
            className=" -mt-4 -mx-2 bg-bal cursor-pointer"
          />
          <p className=" text-[14px] max-w-[240px]">
            We level up your brand marketing with white-labelled arcade games
            and playable ads.
          </p>
          <div className="flex flex-row gap-3">
            {
              Image_white?.map((item, key)=> {
                return <img src = {item.icon.src} key={key} className="w-4 h-4 cursor-pointer" onClick={()=>{router.push(item.url)}} />
              })
            }
          </div>
        </div>
        <div className="lg:w-1/2  w-full flex lg:flex-row-reverse flex-col-reverse  gap-12 items-start justify-start pr-5 pt-12 lg:pt-5  text-[14px]">
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2 cursor-pointer">
            <p className="font-bold ">Legal</p>
            <p onClick={()=>{router.push("/privacy")}}>Privacy</p>
            <p onClick={()=>{router.push("/terms")}}>Terms</p>
            <p>Security</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2 cursor-pointer">
            <p className="font-bold ">Resource</p>
            <p onClick={()=>{router.push("/case-studies")}}>Case Studies</p>
            <p>Docs</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2 cursor-pointer">
            <p className="font-bold ">company</p>
            <p>About</p>
            <p onClick={()=>{router.push("/blog")}}>Blog</p>
            <p onClick={()=>{router.push("/feature")}}>Contact</p>
          </div>
          <div className="flex flex-col items-start justify-start lg:gap-5 gap-2 cursor-pointer">
            <p className="font-bold ">Products</p>
            <p onClick={()=>{router.push("/products")}}>Feature</p>
            <p>FAQ</p>
            <p onClick={()=>{router.push("/pricing")}}>Pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
