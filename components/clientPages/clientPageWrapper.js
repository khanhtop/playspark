import BackNavigation from "./backNavigation";
import PopoutBackNav from "./popoutBackNav";

export default function ClientPageWrapper({
  children,
  withBackNav,
  withGame,
  onBackNav,
  user,
}) {
  return (
    <div style={{ backgroundColor: user.primaryColor, color: user.textColor }}>
      {withBackNav && (
        <BackNavigation title={withBackNav} onBackNav={onBackNav} />
      )}

      <div
        className={`${
          withGame
            ? "h-[calc(100dvh-0px)]"
            : withBackNav
            ? "h-[calc(100dvh-135px)]"
            : "h-[calc(100dvh-80px)]"
        } overflow-y-scroll no-scrollbar relative`}
      >
        {children}
      </div>
    </div>
  );
}
