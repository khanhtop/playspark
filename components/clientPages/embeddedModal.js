export default function EmbeddedModal({ user, isOpen, onClose, children }) {
  if (!isOpen) return <div />;

  return (
    <div
      onClick={onClose}
      className="h-full w-full fixed backdrop-blur top-0 left-0 z-30 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-[80%] max-w-[400px] max-h-[800px] border-2 rounded-2xl"
        style={{
          backgroundColor: user?.primaryColor,
          borderColor: user?.accentColor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
