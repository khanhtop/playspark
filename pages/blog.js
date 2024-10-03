// Next / React
import { useState } from "react";
import BlogSection from "@/components/blog/blogSection";
import Head from "next/head";
import Footer from "@/components/homepage/footer";

export default function Blog({ blogs }) {
  console.log(blogs)
  // Define the number of items to display per page
  // const itemsPerPage = 6;

  // // Calculate the total number of pages based on the data length and items per page
  // const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // // State to track the current page
  // const [currentPage, setCurrentPage] = useState(0);

  // // Function to handle moving to the next page
  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  // };

  // // Function to handle moving to the previous page
  // const handlePreviousPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  // };

  // // Calculate the index of the first item on the current page
  // const startIndex = currentPage * itemsPerPage;

  // // Slice the data to get the items for the current page
  // const blogPosts = blogs.slice(startIndex, startIndex + itemsPerPage);

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

        {/* <div className="flex-1 pt-32 px-4 grid grid-cols-1 md:grid-cols-3 md:gap-x-[32px] lg:gap-y-[48px] gap-y-[32px]">
          {blogPosts.map((blog, key) => (
            <div key={key}>
              <BlogSection blog={blog.data} id={blog.id} />
            </div>
          ))}
        </div> */}
        {/* <BlogPagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        /> */}
        <div className="flex flex-col items-center justify-center py-24 bg-white">
            <h1 className="text-[64px] font-bold text-center">
              {blogs.title}
            </h1>
            <div className="flex flex-row gap-12 px-24 mt-10">
              {
                blogs.blog?.map((item, key)=>{
                  return <Item item={item} key={key} />
                })
              }
            </div>
        </div>
        <div className="  text-black bg-gradient-to-t from-liner to-white pt-10 ">
          <div className="flex flex-col gap-5 max-w-[540px] mx-auto items-center justify-center text-center">
            <h1 className="font-bold text-[54px]">{blogs.game_title}</h1>
            <p className="text-[16px]  px-12 mx-auto">{blogs.game_text}</p>
            <button className="bg-black px-4 py-2 my-10 text-white rounded-lg">
              {blogs.game_button}
            </button>
          </div>
         
        </div>

        

        <Footer />
      </div>
    </>
  );
}

const Item = ({item}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 text-start w-1/3 max-w-[264px]">
        <img src={item.image.url} className="w-[263px] h-[263px] border rounded-[20px] " />
        <div className="flex flex-col items-start min-h-[200px] gap-5">
          <h1 className="text-[18px] font-bold ">{item.blog_title}</h1>
          <p className="text-[16px]">{item.blog_text}</p>
        </div>
        
        <button className="border rounded-[30px] bg-black text-white px-5 py-2 w-full">{item.blog_button}</button>
    </div>
  )
}

import { createClient } from "../helpers/prismic";
import BlogPagination from "@/components/blog/blogPagination";
import Navbar from "@/components/nav/navbar";
import { FooterTitle } from "flowbite-react";

export async function getStaticProps(context) {
  const client = createClient();
  // const blogs = await client.getAllByType("blog");
  const blogs = (await client.getSingle("blog"))?.data;
  return {
    props: { blogs },
  };
}
