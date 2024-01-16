import ClientPageWrapper from "../clientPageWrapper";

export default function ClientProfile({ user, setScreen }) {
  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Profile"
      onBackNav={() => setScreen("home")}
    ></ClientPageWrapper>
  );
}
