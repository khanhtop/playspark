import { PrismicRichText } from "@prismicio/react";

export default function Marketing({page}){
    console.log(page)
    return (
        <div className=" bg-gradient-to-b from-[#50F8EE] to-white flex flex-col justify-center items-center py-10 gap-5">
            <h1 className="font-bold text-center text-[54px] max-w-[590px] mx-auto px-5">{page.marketing_title}</h1>
            <p className="text-[22px] text-center">{page.marketing_text}</p>
            <div className="flex flex-row justify-center items-center gap-10 max-w-[1100px] mx-auto  ">
                {page.marketing_items?.map((item, key)=>{
                    return <Blog item={item} key={key} />
                })}
            </div>
            <button className="border rounded-[30px] text-[16px] px-[55px] py-[18px] bg-[#2FE5A7]">See How It Works</button>
            
            
            
        </div>
    )
}

const Blog = ({item}) => {
    return (
        <div className="flex flex-col items-center justify-start w-1/3 gap-5 max-w-[405px]">
            <img src={item.image.url} className="max-w-[405px] h-[455px] max-h-[455px]" />
            <div className="flex flex-col items-start justify-center gap-5">
                <h1 className="font-bold text-[18px]">{item.title}</h1>
                <PrismicRichText field={item.text} />
            </div>
            
        </div>
    )
}