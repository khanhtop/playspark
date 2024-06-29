import { useState } from "react";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/nav/navbar";
import dynamic from "next/dynamic";
import Hero from "@/components/homepage/hero";
import Section from "@/components/homepage/section";
import TextSection from "@/components/homepage/textSection";
import PaySection from "@/components/homepage/paySection";
import Carousel from "@/components/homepage/carousel";
import GamifySection from "@/components/homepage/gamifySection";
import VideoSection from "@/components/homepage/videoSection";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

export default function Home({ page, url }) {
  console.log(page);
  return (
    <>
      <Head>
        <title>{page.seo_title}</title>
        <meta property="description" content={page.seo_description} />
      </Head>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <Navbar />

        <Section backgroundImage={page?.hero_background_image?.url}>
          <Hero page={page} />
        </Section>
        <Section>
          <TextSection />
        </Section>
        <Section>
          <VideoSection />
        </Section>
        <Section>
          <Carousel />
        </Section>
        <Section>
          <GamifySection />
        </Section>
        <Section>
          <PaySection />
        </Section>
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Head from "next/head";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("homepage"))?.data;
  const url = context.resolvedUrl;
  return {
    props: { page, url },
  };
}
