export default function StripeConfirmCredits({
  currentCredits,
  stripePayload,
  onConfirm,
}) {
  return (
    <div className="min-w-[400px]">
      <p className="text-sm text-black/60">Current Balance: {currentCredits}</p>
      <div className="flex flex-col mt-4 font-bold">
        <p>Credits To Add: {stripePayload?.amount}</p>
        <p>Price: ${stripePayload?.price}</p>
        <p>Balance After: {currentCredits + stripePayload?.amount}</p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onConfirm}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-xl"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
