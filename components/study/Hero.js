export default function Hero({ page }) {
  return (
    <div className="lg:min-h-[900px] min-h-fit w-full bg-cover flex  bg-[#57F295] mt-20 lg:mt-0">
      <div className="max-w-[1600px] mx-auto flex-1 flex flex-col lg:flex-row text-black bg-cover px-40 pt-20 lg:gap-8 bg-black/0 items-center relative">
        <div className="flex flex-col items-center  lg:items-start justify-start flex-1 text-start lg:text-left gap-10 lg:w-1/2 w-full">
          <h1 className="text-[64px] font-bold">{page.hero_title}</h1>
          <h1 className="text-xl lg:text-2xl font-light max-w-[500px] ">
            {page.hero_text_1}
          </h1>
          <h1 className="text-xl lg:text-2xl font-light max-w-[500px] mt-4">
            {page.hero_text_2}
          </h1>
        </div>
        <div className=" absolute bottom-20 right-0 w-1/2" >
          <img
            src={page.hero_image.url}
            className="w-[600px] h-auto hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
