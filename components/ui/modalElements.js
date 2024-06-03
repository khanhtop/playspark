export function ModalButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:opacity-80 transition cursor-pointer mt-2 bg-green-500 w-[60%] h-12 rounded-full font-octo text-2xl text-white shadow-lg shadow-[#222]"
    >
      {text}
    </button>
  );
}

export function ModalText({ children }) {
  return (
    <p className="text-[#666] text-lg font-bold text-center font-octo">
      {children}
    </p>
  );
}
