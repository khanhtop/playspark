import GameButton from "@/components/uiv2/gameButton";

export default function ModalRewards({ data }) {
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4">
      {data?.rewards?.map((item, key) => (
        <RewardRow
          item={item}
          key={key}
          primaryColor={data.primaryColor}
          textColor={data.textColor}
        />
      ))}
    </div>
  );
}

function RewardRow({ item, primaryColor, textColor }) {
  console.log(item);
  return (
    <div className="flex h-16 text-black/70 font-octo">
      <div className="bg-white/50 backdrop-blur flex-1 flex items-center rounded-full overflow-hidden px-4">
        <div className="flex-1 flex items-center justify-center capitalize text-center text-black/70 ">
          <p>
            {item.input} {item.inputOperand === "==" ? " " : "More Than "}
            {item.inputValue.toString()}
          </p>
        </div>
        <div>
          <img src={item.image} className="w-16 p-2" />
        </div>
        <div
          style={{ color: primaryColor }}
          className="flex-1  flex items-center justify-center text-center"
        >
          {item.description}
        </div>
      </div>
      <div className="px-4 py-2">
        <button
          style={{
            backgroundColor: primaryColor,
            color: textColor,
          }}
          className="h-full w-24 border-4 rounded-full"
          onClick={() => null}
        >
          Claim
        </button>
      </div>
    </div>
  );
}
