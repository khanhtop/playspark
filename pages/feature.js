import Head from "next/head";
import React, { useCallback, useState } from "react";
import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Script from "next/script";
import privacyLogo from '/public/images/privacy_logo.png'
import { useRouter } from "next/router";

export default function Feature({ page }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{page.seo_title}</title>
        <meta property="description" content={page.seo_description} />
        <script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" />
      </Head>
      <Script
        src="//code.tidio.co/o1tu31nt1q7jgvu7jqounf2czebgif2m.js"
        strategy="afterInteractive"
      />
      <div className="h-screen overflow-y-scroll  min-w-[430px] mx-auto bg-white">
        <Navbar />
        {/* <ColsWithCTA
          image={page.hero_image?.url}
          title={page.hero_title}
          boldText={page.hero_bold_text}
          text={page.hero_text}
        /> */}
        <div className="  py-40 flex flex-col items-center justify-center gap-5 max-w-[1200px] mx-auto ">
          <button className="border rounded-[10px] px-5 py-1">
            {page.hero_button_text}
          </button>
          <h1 className="font-bold text-[54px]  text-center -tracking-[3px]">
            {page.hero_title}
          </h1>
          <p className="text-[22px] text-center max-w-[610px] mx-auto">
            {page.hero_text}
          </p>
          <div className=" flex flex-row items-start justify-center mx-auto pt-5  bg-white shadow-lg shadow-grey border rounded-[24px] px-16 max-w-[900px] max-h-[650px] gap-2">
            <div className="flex flex-col items-start justify-start min-w-[445px] gap-2 ">
                <h1 className="font-bold text-[26px] leading-[60px] -tracking-wider font-roboto ">{page.blog_title}</h1>
                <p className="px-10 text-[16px] leading-[23px] -tracking-wide text-subtitle max-w-[345px] ">{page.blog_text}</p>
                <div className="min-w-[445px] flex flex-col gap-1 bg-[#EBF5F7] p-2 " >
                  <div>
                      <label>Email*</label>  
                      <input className="bg-[#F3F7F9] w-full border border-[#C4D0DE]" />
                  </div>
                  <div>
                      <label>Contact Number*</label>  
                      <input className="bg-[#F3F7F9] w-full border border-[#C4D0DE]" />
                  </div>
                  <div>
                      <label>First name</label>  
                      <input className="bg-[#F3F7F9] w-full border border-[#C4D0DE]" />
                  </div>
                  <div>
                      <label>Last name</label>  
                      <input className="bg-[#F3F7F9] w-full border border-[#C4D0DE]" />
                  </div>
                  <div>
                      <label>Business Name</label>  
                      <input className="bg-[#F3F7F9] w-full border border-[#C4D0DE]" />
                  </div>
                  <div>
                      <label>Message</label>  
                      <textarea className="bg-[#F3F7F9] w-full border border-[#C4D0DE] max-h-[60px]" />
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <div className="bg-blue-600 max-w-[130px] px-1 py-1 border rounded-[1px] h-10"><p className="text-white text-[9px]">protected by <b>reCAPTCHA</b> <br /> privacy - terms</p>  </div>
                    <img src={privacyLogo.src} className="w-11 h-10 cursor-pointer" />
                  </div>
                  <button className="bg-[#4FB7FF] border rounded-[3px] max-w-[70px] text-[10px] px-2 py-1 mt-3">Submit</button>
                </div>
            </div>
          

          <div className="relative box-content h-[690px] w-1/2 aspect-[1.935979513444302]  ">
            <iframe
              className="w-[100%] h-[100%] absolute top-0 left-0 meetings-iframe-container"
              src="https://meetings.hubspot.com/lsantamaria?embed=true"
            ></iframe>
          </div>
        </div>

          </div>
          
        <div className="  text-black bg-gradient-to-t from-liner to-white  ">
          <div className="flex flex-col gap-5 max-w-[520px] mx-auto items-center justify-center">
            <h1 className="font-bold lg:text-[54px] text-[36px] lg:leading-[60px] leading-[32px] text-center px-5 lg:px-0 font-roboto -tracking-wider">
              Create your game for free today
            </h1>
            <p className="text-[16px]  px-10 mx-auto text-center leading-[23px]">
              Elevate your marketing outcomes with branded mobile games and
              playable ads. Create, test and iterate for free and then enjoy low
              cost games that deliver amazing ROI.
            </p>
            <button className="bg-free px-4 py-2 my-10 text-black rounded-[30px]"
              onClick={()=>{router.push("/admin")}}
            >
              Sign Up Free
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("feature"))?.data;
  return {
    props: { page },
  };
}
