export default function Pane({children}) {
  return <div className="flex-1 bg-white pt-36 px-8 overflow-y-scroll">
    {children}
  </div>
}
