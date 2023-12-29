import { useAppContext } from "@/helpers/store";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export function RewardedComponent({ children }) {
  const context = useAppContext();

  if (context?.profile?.subscription?.rewardedContent === true) {
    return <div>{children}</div>;
  } else {
    return <div className="opacity-10 pointer-events-none">{children}</div>;
  }
}

export function BrandingComponent({ children }) {
  const context = useAppContext();

  if (context?.profile?.subscription?.brandedContent === true) {
    return <div>{children}</div>;
  } else {
    return (
      <div className=" pointer-events-none text-white relative">
        <div className="absolute h-full w-full top-0 text-xs flex justify-end gap-1">
          <LockClosedIcon className="h-[13px] w-[13px]" />
          <p>Upgrade Your Plan</p>
        </div>
        <div className="opacity-10">{children}</div>
      </div>
    );
  }
}

export function PAYGSummary({ data }) {
  const context = useAppContext();

  if (
    context?.profile?.subscription?.tier === 4 &&
    (data?.sponsoredVideo || data?.survey)
  ) {
    return (
      <div className="my-4">
        <p>Additional Game Fees</p>
        {data?.sponsoredVideo && (
          <p className="opacity-60">Sponsored Video: $10</p>
        )}
        {data?.survey && <p className="opacity-60">Survey: $5</p>}
      </div>
    );
  } else {
    return <div />;
  }
}
