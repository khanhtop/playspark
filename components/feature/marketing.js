import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import MuxPlayer from "@mux/mux-player-react";

export default function Marketing({ page }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="bg-gradient-to-b from-[#50F8EE] to-white flex flex-col justify-center items-center py-10 gap-5 w-full mx-auto">
      <h1 className="font-bold text-center lg:text-[54px] text-[48px] max-w-[420px] lg:max-w-[590px] mx-auto lg:-tracking-normal -tracking-wider  leading-[40px] lg:leading-[60px] font-roboto  ">
        {page.marketing_title}
      </h1>
      <p className="text-[22px] text-center">{page.marketing_text}</p>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:max-w-[1100px] mx-auto">
        {page.marketing_items?.map((item, key) => {
          return <Blog item={item} key={key} />;
        })}
      </div>
      <button
        className="border rounded-[30px] text-[16px] px-[55px] py-[18px] mt-10 bg-free text-black"
        onClick={() => setOpenModal(true)}
      >
        See How It Works
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
  );
}

const Blog = ({ item }) => {
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
      className=" w-full lg:w-1/3  max-w-[405px]"
    >
      <div className="flex flex-col items-center justify-center lg:justify-start gap-5">
        <img
          src={item.image.url}
          className="max-w-[200px] lg:max-w-[405px] h-[272px] lg:h-[455px] max-h-[455px]"
          style={{
            backgroundColor: 'transparent',
            mixBlendMode: 'multiply',  // Multiplies background color with the image
            filter: 'opacity(0.8)',     // Adjust opacity to blend colors
          }}
        />
        <div className="flex flex-col items-center lg:items-start justify-center gap-5 px-10">
          <h1 className="font-bold text-[18px]">{item.title}</h1>
          <PrismicRichText field={item.text} />
        </div>
      </div>
    </motion.div>
  );
};
