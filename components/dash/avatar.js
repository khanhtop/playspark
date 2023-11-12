import { useAppContext } from "@/helpers/store";

export default function Avatar({ character, onClick }) {
  const context = useAppContext();

  if (
    context?.profile?.profilePhoto &&
    context?.profile?.profilePhoto?.startsWith("http")
  ) {
    return (
      <img
        src={context?.profile?.profilePhoto}
        className="h-12 w-12 rounded-full"
      />
    );
  } else {
    return (
      <div className="cursor-pointer   h-12 w-12 bg-cyan-400 rounded-full flex items-center justify-center">
        <h3 className="text-2xl text-black/50">
          {context?.profile?.companyName?.substring(0, 1)}
        </h3>
      </div>
    );
  }
}
