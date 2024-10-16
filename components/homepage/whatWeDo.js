"use client";
import backImg from "../../public/images/logos.png";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import MuxPlayer from "@mux/mux-player-react";

export default function WhatWeDo({ page }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className=" text-black flex flex-col items-center justify-center min-w-[430px] bg-white">
      <div className=" flex flex-col w-full gap-5 max-w-[668px] items-center justify-center mx-auto">
        <img
          src={backImg.src}
          className=" mx-auto lg:h-[166px] h-[100px] my-3"
        />
        <h1 className=" text-5xl lg:text-6xl font-bold text-black  text-center  mx-auto lg:mt-22 leading-[60px] font-roboto -tracking-wider  ">
          {page.what_we_do_title}
        </h1>
        <div className="flex flex-col gap-0 text-center text-[22px] font-light mx-auto px-10 text-subtitle">
          <p>{page.what_we_do_text}</p>
          <p>{page.what_we_do_text_1}</p>
        </div>
      </div>
      <div className="  flex flex-col  items-center justify-center pb-12 bg-gradient-to-t from-back to-white w-full">
        <div className="flex lg:flex-row flex-col gap-10 lg:gap-4 m-8 max-w-[1200px]">
          {page.what_we_do_items?.map((item, key) => (
            <Element item={item} key={key} />
          ))}
        </div>
        <button
          className="px-8 py-4 flex items-center justify-center text-center font-medium text-[16px] text-black bg-free rounded-[30px]"
          onClick={() => setOpenModal(true)}
        >
          See How It Works{" "}
        </button>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div>
              <MuxPlayer
                playbackId="Ich7WJrJMupVVOTOUCv54rKVGceLqlHpCd8ddj7uFpA"
                autoPlay={true}
                muted={true}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

function Element({ item }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={controls}
      className="flex-1 flex flex-col gap-4 lg:gap-2 items-center px-8  py-4  lg:w-1/3"
    >
      <div>
        <img src={item.image.url} className="w-auto " />
        <div className="flex flex-col items-start gap-[10px] justify-start mt-10  mx-auto">
          <img src={item.log.url} className="w-auto" />
          <h3 className="font-bold text-[18px] text-left">{item.title}</h3>
          <h3 className="text-[16px] text-left"> {item.text}</h3>
        </div>
      </div>
    </motion.div>
  );
}
