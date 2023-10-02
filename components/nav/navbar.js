export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full h-12 text-white flex items-center justify-between px-8">
      <img src="/branding/logo2.png" className="h-full" />
      <a href="/admin" className="hover:text-white text-white/80 transition">
        Sign In / Up
      </a>
    </div>
  );
}
