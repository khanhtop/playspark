import Script from "next/script";
import Head from "next/head";

export default function Products({ page }) {
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
        <Hero page={page} />
        <Marketing page={page} />
        <Game page={page} />
        <Demo page={page} />
        <Footer page={page} bg="1" />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import ColsWithCTA from "@/components/homepage/colsWithCTA";
import Hero from "@/components/feature/hero";
import Marketing from "@/components/feature/marketing";
import Demo from "@/components/feature/demo";
import Game from "@/components/feature/game";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("products"))?.data;
  return {
    props: { page },
  };
}
