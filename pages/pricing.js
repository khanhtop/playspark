import Script from "next/script";
import Head from "next/head";

export default function Pricing({ page }) {
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
        <Pay page={page} />
        <Footer />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import Pay from "@/components/Pricing/pay";

export async function getServerSideProps(context) {
  const client = createClient();
  const page = (await client.getSingle("pricing"))?.data;
  return {
    props: { page },
  };
}
