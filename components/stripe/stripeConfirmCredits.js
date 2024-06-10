export default function StripeConfirmCredits({
  currentCredits,
  stripePayload,
  onConfirm,
}) {
  return (
    <div className="min-w-[400px]">
      <p className="text-sm text-black/60">
        Balance After: {currentCredits + stripePayload?.amount}
      </p>
      <div className="flex flex-col mt-4 gap-2 font-bold">
        <p>
          Credits To Add:{" "}
          <span className="px-4 py-2 bg-green-200 rounded-lg ml-2">
            {stripePayload?.amount}
          </span>
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onConfirm}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-xl"
        >
          Pay ${stripePayload?.price?.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
