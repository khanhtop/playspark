import { PrismicRichText } from "@prismicio/react";
import selectImage from "../../public/images/select.png"

export default function WhoWeHelp({ page }) {
  return (
    <div className="w-full flex flex-col bg-white from-blue-500/0 to-blue-500/10 items-center justify-center text-black pt-16 pb-16 px-4">
      <div className="text-center">
        <button className="text-center text-[13px] rounded-[10px] border border-black border-1 px-3 py-1 ">
          {page.level_sub_title}
        </button>
        <h1 className="text-[54px] font-bold ">
            {page.level_title}
        </h1>
        <p className="text-[22px] my-4 mb-10 text-center max-w-[535px] mx-auto">
          {page.level_text}
        </p>
        {page.level_group?.map((item, key) => (
          <Blog item={item} key={key} />
        ))}
      </div>
    </div>
  );
}

const Blog = ({item}) => {
  return (
    <div className="mx-auto max-w-[1000px] " >
      <div className=" flex flex-row shadow-xl shadow-grey border rounded-[10px] py-10">
        <div className="w-1/2  flex flex-col gap-10 items-center justify-center  ">
          <h1 className=" font-bold text-2xl px-10">{item.title}</h1>
          <div className=" flex flex-col gap-8 text-start text-[16px] px-3">
            <div className=" flex flex-row gap-1 justify-center items-center"> 
                {item.text_1[0] && <SelectImg />}
              <PrismicRichText field={item.text_1} />
            </div>
            <div className=" flex flex-row gap-1 justify-center items-center"> 
            {item.text_2[0] && <SelectImg />}
              <PrismicRichText field={item.text_2} />
            </div>
            <div className=" flex flex-row gap-1 justify-center items-center"> 
              {item.text_3[0] && <SelectImg />}
              <PrismicRichText field={item.text_3} />
            </div>
          </div>
          
      </div>
      <div className="w-1/2 flex items-center justify-center">
          <img src = {item.image.url}  />
      </div>
      </div>
      <div className="h-32 py-10">
        {
          item.button_text && <button className="bg-button_level w-[241px] text-black rounded-lg py-3 px-3 " >{item.button_text}</button>
        }
      </div>
    </div>
  )
}


const SelectImg = () => {
    return(
      <img src={selectImage.src}/>
    ) 
  }

