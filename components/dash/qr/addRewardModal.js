import Button from "@/components/forms/button";
import Input from "@/components/forms/input";

export default function AddRewardModal({ user, isOpen, onClose, children }) {
  if (!isOpen) return <div />;

  return (
    <div
      onClick={onClose}
      className="h-screen w-screen fixed backdrop-blur top-0 left-0 z-30 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-[500px] max-h-[800px] border-2 rounded-2xl py-4 px-4 flex flex-col gap-4"
        style={{
          backgroundColor: "#111",
          borderColor: user?.accentColor,
        }}
      >
        <h1 className="text-white">Add A Reward</h1>
        <Input
          className="w-full h-10"
          label="Reward name"
          labelColor="text-white/70"
          placeholder="My reward"
          // value={context?.profile?.apiKey}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Reward description"
          labelColor="text-white/70"
          placeholder="My reward entitles you to..."
          // value={context?.profile?.apiKey}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Amount of token required to redeem"
          labelColor="text-white/70"
          placeholder="Click Generate To Generate an API Key"
          value={100}
          readonly={true}
          type="number"
        />
        <Button onClick={() => onClose()}>Add Reward</Button>
      </div>
    </div>
  );
}
