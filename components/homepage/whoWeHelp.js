export default function WhoWeHelp({ page }) {
  return (
    <div className="w-full flex xl:gap-12 flex-col xl:flex-row bg-gradient-to-b from-blue-500/0 to-blue-500/10 items-center xl:items-start justify-center text-black pt-16 pb-16 px-4 xl:px-12">
      <div className="xl:text-left flex-1">
        <h1 className="text-4xl font-bold text-white">
          {page.who_we_help_title}
        </h1>
        <p className="text-center xl:text-left text-2xl font-light mt-4 mb-4 max-w-[800px] text-white/80">
          {page.who_we_help_text_one}
        </p>
        <p className="text-center xl:text-left text-2xl font-light mt-2 mb-4 max-w-[800px] text-white/80">
          {page.who_we_help_text_two}
        </p>
      </div>

      <div className="w-1/4">
        <img src={page.who_we_help_image?.url} className="w-full" />
      </div>
    </div>
  );
}
