export default function ModalGameOver({ data }) {
  console.log(data);
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 font-octo text-black text-2xl items-center">
      <h1>You scored {data.gameOverScore}</h1>
      <h1>You have {data.gameOverRevives} revives remaining</h1>
      <button onClick={() => data?.onRevive()}>Revive</button>
    </div>
  );
}
