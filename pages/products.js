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
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("products"))?.data;
  return {
    props: { page },
  };
}
