import Script from "next/script";
import Head from "next/head";
import PrivacyImage from "/public/images/privacy.png";
import Luke from "/public/images/luke.png";
import React, { useCallback, useState } from 'react';


export default function Feature({ page }) {



  return (
    <>
      <Head>
        <title>{page.seo_title}</title>
        <meta property="description" content={page.seo_description} />
      </Head>
      <Script
        src="//code.tidio.co/o1tu31nt1q7jgvu7jqounf2czebgif2m.js"
        strategy="afterInteractive"
      />
      <div className="h-screen overflow-y-scroll max-w-[1200px] min-w-[430px] mx-auto bg-white">
        <Navbar />
        {/* <ColsWithCTA
          image={page.hero_image?.url}
          title={page.hero_title}
          boldText={page.hero_bold_text}
          text={page.hero_text}
        /> */}
        <div className="  py-40 flex flex-col items-center justify-center gap-5 w-[924px] mx-auto ">
          <button className="border rounded-[10px] px-5 py-1">
            {page.hero_button_text}
          </button>
          <h1 className="font-bold text-[54px]  text-center -tracking-[3px]">
            {page.hero_title}
          </h1>
          <p className="text-[22px] text-center max-w-[610px] mx-auto">
            {page.hero_text}
          </p>
          <div className="border shadow-xl shadow-grey rounded-[20px] w-full mx-auto p-10 flex flex-row items-center justify-center gap-2">
            <div className="w-[445px] flex flex-col items-start justify-center gap-5">
              <div>
                <h1 className="text-center text-[26px] font-bold">
                  {page.blog_title}
                </h1>
                <p className="text-[16px] text-start max-w-[350px] px-5">
                  {page.blog_text}
                </p>
              </div>

              <div className="bg-[#EBF5F7] w-full  h-[500px] flex flex-col gap-2 p-5 text-[#5B5B5B] ">
                <div>
                  <label>Email*</label>
                  <input className="w-full bg-[#EBF5F7] border border-gray-500" />
                </div>
                <div>
                  <label>Contact Number*</label>
                  <input className="w-full bg-[#EBF5F7] border border-gray-500" />
                </div>
                <div>
                  <label>First name</label>
                  <input className="w-full bg-[#EBF5F7] border border-gray-500" />
                </div>
                <div>
                  <label>Last name</label>
                  <input className="w-full bg-[#EBF5F7] border border-gray-500" />
                </div>
                <div>
                  <label>Business Name</label>
                  <input className="w-full bg-[#EBF5F7] border border-gray-500" />
                </div>
                <div>
                  <label>Message</label>
                  <textarea className="w-full bg-[#EBF5F7] border border-gray-500 max-h-14" />
                </div>
                <img src={PrivacyImage.src} className="w-36" />
                <button className="bg-[#4FB7FF] px-2 py-1 w-20 font-bold border rounded-lg">
                  submit
                </button>
              </div>
            </div>
            <div className="w-[369px] h-[610px] bg-[#3A516B] flex flex-col items-center justify-col  gap-5 py-10 ">
              <img src={Luke.src} className="w-20 h-20" />
              <p className="text-white text-[20px]">
                Meet with Luke Santamaria
              </p>

              <div className="flex">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
        <Game />
        <Footer />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Game from "@/components/forms/game";
import Calendar from "@/components/forms/calendar";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("feature"))?.data;
  return {
    props: { page },
  };
}
