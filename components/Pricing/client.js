


import ClientBlog from "../forms/client_blog"
export default function Client ({page}) {
    return (
        <div className=" flex flex-col items-center justify-center text-black bg-white py-10 relative">
            <button className="border border-black rounded-xl px-3 py-2 mt-[59px]"  >{page.client_button}</button>
            <h1 className="lg:text-[54px] text-[48px] text-center lg:w-full w-[350px]  font-bold my-5 px-[48px] lg:px-5 " >
                {page.client_title}
            </h1>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-full h-80 lg:h-80 absolute z-10 bg-gradient-to-b from-white to-transparent"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-center lg:max-w-[1200px]  mx-auto ">
                    {page.client_blog?.map((item, key)=> {
                        return <ClientBlog item={item} key={key} />
                    })}
                </div>
            </div>
           
        </div>
    )
}
