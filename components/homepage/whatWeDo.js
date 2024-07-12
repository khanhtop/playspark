export default function WhatWeDo({ page }) {
  console.log(page);
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#EEE] text-black pt-16 pb-16 px-4">
      <h1 className="text-4xl font-bold text-blue-600">
        {page.what_we_do_title}
      </h1>
      <p className="text-center text-xl font-light mt-4 mb-4 max-w-[800px] text-black/80">
        {page.what_we_do_text}
      </p>
      <div className="flex gap-4 mt-8 flex-wrap">
        {page.what_we_do_items?.map((item, key) => (
          <Element item={item} key={key} />
        ))}
      </div>
    </div>
  );
}

function Element({ item }) {
  return (
    <div className="flex-1 flex flex-col gap-2 items-center px-8 basis-[360px] shadow-md border-black/5 border-2 py-4 rounded-2xl hover:shadow-xl group">
      <img
        src={item.image.url}
        className="w-[200px] group-hover:scale-105 transition"
      />
      <div className="min-h-20">
        <h3 className="text-blue-600 font-bold text-3xl">{item.title}</h3>
      </div>

      <h3 className="font-light text-lg text-black/70">{item.text}</h3>
    </div>
  );
}
