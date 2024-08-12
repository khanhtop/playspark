import { PrismicRichText } from "@prismicio/react";
import Head from "next/head";

export default function BlogPost({ blogPost, url }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{blogPost.seo_title}</title>
        <meta property="og:title" content={blogPost.seo_title} />
        <meta name="description" content={blogPost.seo_description} />
        <meta property="og:description" content={blogPost.seo_description} />
        <meta property="og:image" content={blogPost.og_image?.url} />
        <meta name="twitter:title" content={blogPost.seo_title} />
        <meta name="twitter:description" content={blogPost.seo_description} />
        <meta name="twitter:image" content={blogPost.og_image?.url} />
        <meta property="og:url" content={"https://zlinky.com" + url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col">
        <Navbar />
        <div className="pt-28 px-4 flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center text-center gap-[12px]">
            <h1 className="text-[42px] font-semibold leading-[54px] tracking-[-0.84px] pb-8 pt-2 max-w-[800px]">
              {blogPost?.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-[48px] text-center px-4">
          <img
            className="max-h-[300px] mb-4 rounded-xl"
            src={blogPost?.featured_image?.url}
            alt={blogPost?.featured_image?.alt}
          />
          <div className="max-w-[800px] flex flex-col gap-2">
            <PrismicRichText field={blogPost?.text} />
          </div>

          <div className="w-full pb-8">
            <hr className="w-full" />
            <BlogFooter />
          </div>
        </div>
      </div>
    </>
  );
}

import { createClient } from "../../helpers/prismic";
import { useRouter } from "next/router";
import BlogFooter from "@/components/blog/blogFooter";
import Navbar from "@/components/nav/navbar";

export async function getServerSideProps(context) {
  const client = createClient();
  const { id } = context.query;
  const _blogPost = await client.getByID(id);
  const blogPost = _blogPost.data;
  const url = context.resolvedUrl;
  return {
    props: { blogPost, url },
  };
}
