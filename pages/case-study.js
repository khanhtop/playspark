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
      <div className="h-auto mx-auto w-full max-w-full">
        <Navbar />
        <Hero page={page} />
        <Items page={page} />
        <Game />
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
import Game from "@/components/forms/game"

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("study"))?.data;
  return {
    props: { page },
  };
}
