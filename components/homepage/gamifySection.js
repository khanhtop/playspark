export default function GamifySection() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#000123]/90">
      <h1 className="font-anton text-[20px] leading-[25px] lg:text-[80px] lg:leading-[90px] text-center mb-8">
        <span className="text-cyan-400">Gamify</span>
        {` `} Your Audiences
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-12">
        <GamifyCard
          heading="SETUP YOUR GAME"
          subtext="Select your game, apply your
branding, set your rewards and
voila!"
        />
        <GamifyCard
          heading="EMBED AND SHARE"
          subtext="Plug your game into your own
website, app, email or social media
post and expose your game across
multiple touchpoints."
        />
        <GamifyCard
          heading="GROW REVENUE"
          subtext="Integrate advertising into your game
like rewarded video, banner ads and
sponsored surveys. Insert direct call to
actions that drive conversions to site
visits, video views and sales."
        />
      </div>
    </div>
  );
}

function GamifyCard({ image, heading, subtext }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#111] w-[60px] md:w-[300px] h-[60px] md:h-auto md:aspect-square rounded-lg" />
      <h3 className="text-sm md:text-2xl font-octo text-cyan-300 my-1 md:my-4">
        {heading}
      </h3>
      <h3 className="text-sm md:text-2xl font-octolight">{subtext}</h3>
    </div>
  );
}
