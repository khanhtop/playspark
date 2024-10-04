

export default function Hero ({page}) {
    return (
        <div className=" bg-gradient-to-t from-[#50F8EE] to-white flex flex-col justify-center items-center pb-10 pt-40">
        
                <h1 className="lg:text-[54px] text-[48px]  max-w-[364px] lg:max-w-[660px] mx-auto text-center font-bold">{page.hero_title}</h1>
                <p className="text-[22px] text-center lg:max-w-[535px] max-w-[364px] mx-auto px-2 "> {page.hero_text}</p>
            <img src={page.hero_image?.url} className="max-w-[413px] max-h-[413px]" />
            <div className="flex flex-col lg:flex-row gap-[30px]">
                <button className="bg-black text-white border rounded-[30px] px-[15px] py-[10px]">Get Started free</button>
                <button className="bg-white text-black border rounded-[30px] px-[15px] py-[10px]">Schedule Demo</button>
            </div>
        </div>
    )
}