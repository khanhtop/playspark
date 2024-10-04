// Next / React
import { useMemo, useState } from "react";
import BlogSection from "@/components/blog/blogSection";
import Head from "next/head";
import Footer from "@/components/homepage/footer";
import clsx from 'clsx'

export default function Blog({ blogs }) {
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
      <div className=" flex flex-col max-w-[1200px] min-w-[430px] mx-auto">
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
        <div className="flex flex-col items-center justify-center pt-[119px] bg-white">
            <h1 className="text-[64px] font-bold text-center">
              {blogs.title}
            </h1>
            <div className="flex lg:flex-row flex-col  gap-12 lg:px-[140px] mt-10">
              {
                blogs.blog?.map((item, key)=>{
                  return <Item item={item} key={key} />
                })
              }
            </div>
        </div>
        <Game />
        <Footer />
      </div>
    </>
  );
}

const Item = ({item}) => {
  let buttonColor
  useMemo(()=>{
    if(item.blog_button == "Read More"){
      buttonColor = "bg-[#2FE5A7] text-black"
    }
    else {
      buttonColor = " bg-[#364153] text-white"
    }
  },[item.blog_button])


  return (
    <div className="flex flex-col justify-center items-center gap-10 text-start w-full lg:w-1/3 max-w-[264px]">
        <img src={item.image.url} className="w-[263px] h-[263px] border rounded-[20px] " />
        <div className="flex flex-col items-start lg:min-h-[200px] min-h-fit gap-5">
          <h1 className="text-[18px] font-bold ">{item.blog_title}</h1>
          <p className="text-[16px]">{item.blog_text}</p>
        </div>
        <button className={clsx("border rounded-[30px] px-5 py-2 w-[241px]", buttonColor)}>{item.blog_button}</button>
    </div>
  )
}

import { createClient } from "../helpers/prismic";
import BlogPagination from "@/components/blog/blogPagination";
import Navbar from "@/components/nav/navbar";
import { FooterTitle } from "flowbite-react";
import Game from "@/components/forms/game"

export async function getStaticProps(context) {
  const client = createClient();
  // const blogs = await client.getAllByType("blog");
  const blogs = (await client.getSingle("blog"))?.data;
  return {
    props: { blogs },
  };
}
