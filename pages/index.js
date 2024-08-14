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

export default function Home({ page, blogs }) {
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

        <Section backgroundImage={page?.hero_background_image?.url}>
          <Hero page={page} />
        </Section>
        <Section>
          <WhatWeDo page={page} />
        </Section>
        <Section>
          <WhoWeHelp page={page} />
        </Section>
        <Section>
          <ClientsSection clients={page.clients_logos} />
        </Section>
        <Section>
          <TestimonialsSection
            testimonials={page.testimonials}
            title={page.testimonials_title}
          />
        </Section>
        <Section>
          <PricingSection page={page} />
        </Section>
        <Section>
          <BlogsSection blogs={blogs} />
        </Section>
        <Footer />
        {/* <Section>
          <Carousel />
        </Section>
        <Section>
          <GamifySection />
        </Section>
        <Section>
          <PaySection />
        </Section> */}
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Head from "next/head";
import Script from "next/script";
import WhatWeDo from "@/components/homepage/whatWeDo";
import WhoWeHelp from "@/components/homepage/whoWeHelp";
import Footer from "@/components/homepage/footer";
import ClientsSection from "@/components/homepage/clientsSection";
import TestimonialsSection from "@/components/homepage/testimonialsSection";
import PricingSection from "@/components/homepage/pricingSection";
import BlogsSection from "@/components/homepage/blogsSection";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("homepage"))?.data;
  const blogs = await client.getAllByType("blog-post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    limit: 4,
  });
  return {
    props: { page, blogs },
  };
}
