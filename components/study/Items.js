import { PrismicRichText } from "@prismicio/react";
import selectImage from "../../public/images/select.png"

export default function Items({ page }) {
  return (
    <div className="w-full flex flex-col bg-white from-blue-500/0 to-blue-500/10 items-center justify-center text-black py-10 px-4">
      <div className="text-center">
        {page.blog?.map((item, key) => (
          <Blog item={item} key={key} />
        ))}
      </div>
    </div>
  );
}

const Blog = ({item}) => {
  return (
    <div className="mx-auto max-w-[1000px] " >
      <p className="text-[54px] text-center font-bold ">{item.title}</p>
      <div className=" flex flex-col-reverse lg:flex-row gap-5  shadow-xl shadow-grey border rounded-[10px] my-5 py-10">
        <div className="lg:w-1/2  w-full flex flex-col gap-10 items-center justify-center">
          <h1 className=" font-bold text-2xl px-12 text-start">{item.blog_title}</h1>
          <div className=" flex flex-col gap-8 text-start text-[16px] px-3">
            <div className=" flex flex-row gap-1 justify-center items-center"> 
                {item.blog_text_1 && <SelectImg />}
                <p className="text-[22px] text-start">{item.blog_text_1}</p>
            </div>
            <div className=" flex flex-row gap-1 justify-center items-center"> 
            {item.blog_text_2 && <SelectImg />}
            <p className="text-[22px] text-start">{item.blog_text_2}</p>
            </div>
          </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img src = {item.blog_image.url}  />
      </div>
      </div>
    </div>
  )
}


const SelectImg = () => {
    return(
      <img src={selectImage.src}/>
    ) 
  }

