// Next / React
import { useState } from "react";
import BlogSection from "@/components/blog/blogSection";
import Head from "next/head";

export default function Blog({ blogs }) {
  // Define the number of items to display per page
  const itemsPerPage = 6;

  // Calculate the total number of pages based on the data length and items per page
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Function to handle moving to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  // Function to handle moving to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Calculate the index of the first item on the current page
  const startIndex = currentPage * itemsPerPage;

  // Slice the data to get the items for the current page
  const blogPosts = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Head>
        <title>Blog | PlaySpark</title>
        <meta property="og:title" content="Blog | Zlinky" />
        <meta name="description" content="PlaySpark Blog" />
        <meta property="og:description" content="PlaySpark Blog" />
        <meta property="og:url" content={"https://playspark.co/blog"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />

        <div className="flex-1 pt-32 px-4 grid grid-cols-1 md:grid-cols-3 md:gap-x-[32px] lg:gap-y-[48px] gap-y-[32px]">
          {blogPosts.map((blog, key) => (
            <div key={key}>
              <BlogSection blog={blog.data} id={blog.id} />
            </div>
          ))}
        </div>
        <BlogPagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

import { createClient } from "../helpers/prismic";
import BlogPagination from "@/components/blog/blogPagination";
import Navbar from "@/components/nav/navbar";

export async function getStaticProps(context) {
  const client = createClient();
  const blogs = await client.getAllByType("blog-post");
  console.log(blogs);
  return {
    props: { blogs },
  };
}
