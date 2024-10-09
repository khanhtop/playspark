import Head from "next/head";
import React, { useCallback, useState } from "react";
import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Script from "next/script";
// import Script from "next/script";

export default function Feature({ page }) {
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
          <div className="relative box-content h-[690px] w-[100%] aspect-[1.935979513444302] px-10 mt-10">
            <iframe
              className="w-[100%] h-[100%] absolute top-0 left-0 meetings-iframe-container"
              src="https://meetings.hubspot.com/lsantamaria?embed=true"
            ></iframe>
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
            <button className="bg-free px-4 py-2 my-10 text-black rounded-[30px]">
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
