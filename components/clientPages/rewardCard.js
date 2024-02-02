import UIButton from "../ui/button";

export default function RewardCard({ user, item }) {
  return (
    <div
      className={`flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group h-[260px] shadow-lg hover:shadow-md shadow-black/50`}
    >
      <div
        style={{
          backgroundImage: `url("/badges/challenge.png")`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 flex items-end p-2"
      >
        <div className="flex justify-end w-full">
          <UIButton
            onClick={() => null}
            primaryColor={user.accentColor}
            textColor={user.primaryColor}
            text="Claim"
            className=""
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between pt-4 px-4 items-center">
          <h3 className="text-2xl">{item.name}</h3>
          <div className="flex items-center gap-4">
            <img src="/clientPages/coins.png" className="h-6 w-6" />
            <p className="text-2xl">{item.price}</p>
          </div>
        </div>
        <h3 className="text-base opacity-70 font-roboto px-4 pb-4">
          {item.description}
        </h3>
      </div>
    </div>
  );
}
