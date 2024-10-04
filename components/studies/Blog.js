import { useMemo } from "react"
import clsx from "clsx";


export default function Blog({page}){
    return (
        <div className="bg-gradient-to-b from-liner to-white pt-20 lg:pb-20">
            <div className="flex lg:flex-row  flex-col gap-[54px]  items-start justify-normal lg:px-[140px]">
                {page.studies_blog?.map((item, key)=>{
                   return  <Element item={item} key={key} />
                })}
            </div>
        </div>
    )
}

const Element = ({item}) => {
    let className

    useMemo(() => {
        if(item.button_text ==  "Read More"){
            className = "bg-[#2FE5A7] text-black"
        }
        else {
            className= " bg-[#364153] text-white"
        }
    }, [item.button_text])


    return (
        <div className="lg:w-1/3 w-[290px] mx-auto flex flex-col justify-start items-center  py-5 max-h-[600px] gap-5">
            <img src={item.image.url} className="w-full h-[270px]" />
            <div className="flex flex-col gap-5 items-start h-auto lg:h-[225px] w-full">
                <h1 className="font-bold text-[18px]">{item.title}</h1>
                <p className="text-[16px]">{item.text}</p>
            </div>
            <button className={clsx(" border rounded-[30px] px-[70px] py-[10px]", className)}>{item.button_text}</button>
        </div>
    )
}