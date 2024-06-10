export default function StripeSelectCredits({ onSelect, currentCredits }) {
  return (
    <div className="min-w-[400px]">
      <p>Select the number of credits to add</p>
      <p className="text-sm text-black/60">Current Balance: {currentCredits}</p>
      <div className="flex flex-col gap-4 mt-4">
        <CreditRow first />
        <CreditRow amount={100} price={10} discount={0} onSelect={onSelect} />
        <CreditRow amount={500} price={45} discount={10} onSelect={onSelect} />
        <CreditRow amount={1000} price={85} discount={15} onSelect={onSelect} />
        <CreditRow
          amount={5000}
          price={400}
          discount={20}
          onSelect={onSelect}
        />
        <CreditRow
          amount={10000}
          price={750}
          discount={25}
          onSelect={onSelect}
        />
        <CreditRow
          amount={20000}
          price={1400}
          discount={30}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

function CreditRow({ amount, price, discount, first, onSelect }) {
  if (first) {
    return (
      <div className="flex items-center gap-2">
        <div className="border-b-2 w-20 text-center text-black/100 pb-2 mr-3 text-base">
          Amount
        </div>
        <div className="border-b-2 flex-1 text-center text-base pb-2">
          Price
        </div>
        <div className="border-b-2 flex-1 text-center text-base pb-2">
          Discount
        </div>
        <div className="w-24" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="bg-green-200 w-20 text-center text-black/60 py-2 mr-3 text-lg rounded-lg">
        {amount}
      </div>
      <div className="flex-1 text-center text-lg">${price}</div>
      <div className="flex-1 text-center text-lg">{discount}%</div>
      <button
        onClick={() => {
          onSelect({
            amount,
            price,
            discount,
          });
        }}
        className="bg-indigo-800 text-white text-lg w-24 py-2 rounded-lg"
      >
        Select
      </button>
    </div>
  );
}
