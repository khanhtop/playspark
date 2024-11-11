"use client";

import { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 shadow-xl shadow-grey border rounded-[10px] lg:max-w-[492px] max-w-[380px] mx-auto px-5">
      {/* Accordion Header */}
      <button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-bold lg:text-[24px] text-[20px] font-roboto -tracking-wider">{title}</span>
        <span className="text-[64px] font-bold">{isOpen ? "-" : "+"}</span>
      </button>
      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 text-gray-600 text-start">{content}</div>
      </div>
    </div>
  );
};

const FAQ = ({ page }) => {
  const [openIndex, setOpenIndex] = useState(null); // Track the currently open accordion index

  const handleToggle = (index) => {
    // If the clicked index is already open, close it (set to null)
    // Otherwise, set the open index to the clicked one
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white flex flex-col pt-[120px]">
      <h1 className="text-[54px] font-bold text-black pb-5">FAQs</h1>
      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center text-black gap-5">
        {page.faq?.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.question}
            content={item.answer}
            isOpen={openIndex === index} // Check if the current index is open
            onToggle={() => handleToggle(index)} // Pass the toggle function
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
