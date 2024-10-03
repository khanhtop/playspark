import Script from "next/script";
import Head from "next/head";
import PrivacyImage from "/public/images/privacy.png";
import Luke from "/public/images/luke.png";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import React from "react";

export default function Feature({ page }) {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);
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
      <div className="h-screen overflow-y-scroll">
        <Navbar />
        {/* <ColsWithCTA
          image={page.hero_image?.url}
          title={page.hero_title}
          boldText={page.hero_bold_text}
          text={page.hero_text}
        /> */}
        <div className=" bg-white py-40 flex flex-col items-center justify-center gap-5 ">
          <button className="border rounded-[10px] px-5 py-1">
            {page.hero_button_text}
          </button>
          <h1 className="font-bold text-[54px] text-center">
            {page.hero_title}
          </h1>
          <p className="text-[22px] text-center max-w-[610px] mx-auto">
            {page.hero_text}
          </p>
          <div className="border shadow-xl shadow-grey rounded-[20px] w-[1200px] mx-auto p-5 flex flex-row items-center justify-center">
            <div className="w-2/3 flex flex-col items-center justify-center gap-5">
              <h1 className="text-center text-[26px] font-bold">
                {page.blog_title}
              </h1>
              <p className="text-[16px] text-start max-w-[350px] mx-auto">
                {page.blog_text}
              </p>
              <div className="bg-[#EBF5F7] flex flex-col gap-2 w-full p-5 text-[#5B5B5B] ">
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
                  <input className="w-full bg-[#EBF5F7] border border-gray-500 h-10" />
                </div>
                <img src={PrivacyImage.src} className="w-36" />
                <button className="bg-[#4FB7FF] px-2 py-1 w-20 font-bold border rounded-lg">
                  submit
                </button>
              </div>
            </div>
            <div className="w-1/2 bg-[#3A516B] flex flex-col items-center justify-between  gap-5  py-20 mx-1">
              <img src={Luke.src} className="w-20 h-20" />
              <p className="text-white text-[30px]">
                Meet with Luke Santamaria
              </p>
              <Calendar
                aria-label="Date (Controlled Focused Value)"
                focusedValue={focusedDate}
                value={defaultDate}
                onFocusChange={setFocusedDate}
                calendarWidth="400px"
              />
            </div>
          </div>
        </div>
        <div className="  text-black bg-gradient-to-t from-liner to-white pt-[132px] ">
          <div className="flex flex-col gap-5 max-w-[520px] mx-auto items-center justify-center text-center">
            <h1 className="font-bold text-[54px]">
              Create your game for free today
            </h1>
            <p className="text-[16px]  px-12 mx-auto">
              Elevate your marketing outcomes with branded mobile games and
              playable ads. Create, test and iterate for free and then enjoy low
              cost games that deliver amazing ROI.
            </p>
            <button className="bg-black px-4 py-2 my-10 text-white rounded-[30px]">
              Sign Up Free
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Game from "@/components/homepage/game";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("feature"))?.data;
  return {
    props: { page },
  };
}
