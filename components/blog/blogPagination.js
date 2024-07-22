import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const BlogPagination = ({
  handleNextPage,
  handlePreviousPage,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div>
      <hr className="mb-[0px]" />
      <div className="flex justify-between items-center">
        <PaginationButtons
          Icon={ChevronLeftIcon}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          imgSrc="images/blog/arrow-left.svg"
          imgAlt="left"
          text="Previous"
          reverse={false}
        />
        <div className="md:hidden">
          Page {currentPage + 1} of {totalPages}
        </div>
        <div className="hidden md:flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`p-[12px] text-[14px] text-[#667085] w-[40px] h-[40px]  ${
                currentPage === index
                  ? "border-none rounded-lg bg-[#F9FAFB] text-[#1D2939]"
                  : ""
              }`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <PaginationButtons
          Icon={ChevronRightIcon}
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          imgSrc="images/blog/arrow-right.svg"
          imgAlt="right"
          text="Next"
          reverse={true}
        />
      </div>
    </div>
  );
};

const PaginationButtons = ({
  onClick,
  disabled,
  imgSrc,
  imgAlt,
  text,
  reverse,
  Icon,
}) => (
  <button
    className={`border md:border-none border-[#D0D5DD] rounded-lg p-[8px] flex gap-[8px] items-center text-[#667085] ${
      reverse ? "flex-row-reverse" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon className="w-[20px] h-[20px]" />
    <p className="hidden md:block">{text}</p>
  </button>
);

export default BlogPagination;
