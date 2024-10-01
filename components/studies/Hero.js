export default function Hero({ page }) {
  return(

    <div className="min-h-[900px] w-full bg-cover flex  bg-gradient-to-tr from-back to-white">
        <div className="max-w-[1600px] mx-auto flex-1 flex flex-col lg:flex-row text-black bg-cover px-40 pt-20 lg:gap-8 bg-black/0 items-center">
        <div className="flex flex-col items-center  lg:items-start justify-start flex-1 text-center lg:text-left gap-7 w-1/2 " >
            <h1 className="text-[54px] font-bold">{page.hero_title}</h1>
            <h1 className="text-xl lg:text-2xl font-light max-w-[500px] ">
            {page.hero_text_1}
            </h1>
            <h1 className="text-xl lg:text-2xl font-light max-w-[500px] mt-4">
            {page.hero_text_2}
            </h1>
        </div>
        <div className="flex items-center justify-center mb-12 lg:mb-0 w-1/2">
            <img src={page.hero_image.url} className="w-auto h-auto"  />
        </div>
        </div>
    </div>
  )
 
}
