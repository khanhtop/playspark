import backImg from '../../public/images/Ticker.png'

export default function WhatWeDo({ page }) {
  return (
    <div className="w-full  text-black flex flex-col items-center justify-center ">
      <div className='bg-white flex flex-col items-center justify-center w-full'>
        <div className="w-full h-auto lg:h-[122px]"> <img src={backImg.src} className="w-full h-auto"/></div>
        <h1 className="text-6xl font-bold text-black max-w-[400px] lg:max-w-[590px] mt-5 lg:mt-32">
          {page.what_we_do_title}
        </h1>
        <p className="text-center text-xl font-light my-4 mx-0 lg:mx-4 max-w-[480px] lg:max-w-[800px] text-black">
          {page.what_we_do_text}
        </p>
      </div>
    
      <div className='bg-gradient-to-t from-back to-white w-full flex flex-col  items-center justify-center pb-12 '>
        <div className="flex lg:flex-row flex-col gap-10 lg:gap-4 m-8 ">
          {page.what_we_do_items?.map((item, key) => (
            <Element item={item} key={key} />
          ))}
        </div>
        <button className="px-8 py-4 flex items-center justify-center text-center text-xl text-white bg-work rounded-full" >See How It Works </button>
      </div>
      
    </div>
  );
}

function Element({ item }) {
  return (
    <div className="flex-1 flex flex-col gap-4 lg:gap-2 items-center px-8  py-4  w-full lg:w-1/3">
      <img
        src={item.image.url}
        className="w-auto "
      />
      <div className="flex flex-col items-start justify-start max-w-[260px]">
        <img 
              src={item.log.url}
              className="w-auto"
            />
            <h3 className="font-bold text-[18px] text-left">{item.title}</h3>
            <h3 className="text-[16px] text-left"> {item.text}</h3>
      </div>
       
    </div>
  );
}


