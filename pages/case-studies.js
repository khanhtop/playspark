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
        <Blog page={page} />
        <Game page={page}/>
        <Footer page={page} bg="2" />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Hero from "@/components/studies/Hero";
import Blog from "@/components/studies/Blog";
import Game from "@/components/studies/game";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("case-studies"))?.data;
  return {
    props: { page },
  };
}
