import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Button({
  className,
  children,
  onClick,
  loading,
  disabled,
}) {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={`${className} flex items-center justify-center ${
        disabled ? "bg-cyan-500/20" : "bg-cyan-500"
      } h-10 rounded-lg hover:bg-cyan-500/75 transition`}
    >
      {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : children}
    </button>
  );
}
