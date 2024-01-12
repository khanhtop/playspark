export default function Hero({ data, context }) {
  if (context.loggedIn?.uid) {
    return (
      <div
        style={{ backgroundColor: data?.primaryColor ?? "#252525" }}
        className="h-[200px] p-[25px]"
      >
        <div className="h-[150px] aspect-square bg-[#777] flex items-center justify-center rounded-full">
          <p className="text-[100px] font-octo">
            {data?.companyName?.substring(0, 1)}
          </p>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
