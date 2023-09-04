export default function Button({ className, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-cyan-500 h-10 rounded-lg hover:bg-cyan-500/75 transition`}
    >
      {children}
    </button>
  );
}
