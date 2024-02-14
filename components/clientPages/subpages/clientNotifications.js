import ClientPageWrapper from "../clientPageWrapper";

export default function ClientNotifications({ user, setScreen }) {
  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Notifications"
      onBackNav={() => setScreen("home")}
    ></ClientPageWrapper>
  );
}
