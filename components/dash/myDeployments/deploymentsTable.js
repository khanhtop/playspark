import DeploymentRow from "./deploymentRow";

export default function DeploymentsTable({ data }) {
  if (!data)
    return (
      <div className="flex flex-col gap-2">
        {Array(5)
          .fill(0)
          .map((item, key) => (
            <SkeletonRow />
          ))}
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      {data.map((item, key) => (
        <DeploymentRow item={item} />
      ))}
    </div>
  );
}

function SkeletonRow() {
  return <div className="h-20 w-full bg-black/10 rounded-lg animate-pulse" />;
}
