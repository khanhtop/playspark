import BackNavigation from "./backNavigation";

export default function ClientPageWrapper({
  children,
  withBackNav,
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
          withBackNav ? "h-[calc(100dvh-135px)]" : "h-[calc(100dvh-80px)]"
        } overflow-y-scroll no-scrollbar`}
      >
        {children}
      </div>
    </div>
  );
}
