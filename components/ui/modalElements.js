export function ModalButton({ text, onClick, data }) {
  return (
    <button
      style={{ backgroundColor: data?.primaryColor }}
      onClick={onClick}
      className="hover:opacity-80 transition cursor-pointer mt-2  w-[60%] h-12 rounded-full custom-font  text-2xl text-white shadow-lg shadow-[#222]"
    >
      {text}
    </button>
  );
}

export function ModalText({ children, data }) {
  return (
    <p className="text-lg font-bold text-center primary-font">{children}</p>
  );
}
