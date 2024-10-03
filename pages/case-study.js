import Script from "next/script";
import Head from "next/head";

export default function CaseStudies({ page }) {
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
        <Hero page={page} />
        <Items page={page} />
        <div className="  text-black bg-gradient-to-t from-liner to-white pt-[50px] ">
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
import Hero from "@/components/study/Hero";
import Items from "@/components/study/Items";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("study"))?.data;
  return {
    props: { page },
  };
}
