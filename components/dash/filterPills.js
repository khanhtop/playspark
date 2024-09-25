import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export default function FilterPills({ options, selected, onSelect }) {
  return (
    <Tabs
      theme={{
        base: "flex flex-col gap-2",
        tablist: {
          base: "flex text-center",
          variant: {
            default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
            underline:
              "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
            pills:
              "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
            fullWidth:
              "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
          },
          tabitem: {
            base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-0 focus:ring-red-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
            variant: {
              default: {
                base: "rounded-t-lg",
                active: {
                  on: "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
                  off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                },
              },
              underline: {
                base: "rounded-t-lg",
                active: {
                  on: "active rounded-t-lg border-b-2 border-black text-black dark:border-cyan-500 dark:text-blue-500",
                  off: "border-b-2 border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300",
                },
              },
              pills: {
                base: "",
                active: {
                  on: "rounded-lg bg-cyan-600 text-white",
                  off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
                },
              },
              fullWidth: {
                base: "ml-0 flex w-full rounded-none first:ml-0",
                active: {
                  on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
                  off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
                },
              },
            },
            icon: "mr-2 h-6 w-6",
          },
        },
        tabitemcontainer: {
          base: "",
          variant: {
            default: "",
            underline: "",
            pills: "",
            fullWidth: "",
          },
        },
        tabpanel: "py-3",
      }}
      onActiveTabChange={(tab) => onSelect(options[tab].value)}
      aria-label="Tabs with underline"
      variant="underline"
      className="tabitem:focus:ring-8"
    >
      {options?.map((item, key) => (
        <Tabs.Item
          className="focus:ring-8"
          onClick={() => onSelect(item.value)}
          active={selected}
          title={item.text}
          icon={item.icon || HiUserCircle}
        />
      ))}
    </Tabs>
  );
}

// export default function FilterPills({ options, selected, onSelect }) {
//   return (
//     <div className="flex flex-col items-start font-roboto">
//       <div className="flex mb-8 rounded-full overflow-hidden bg-white">
//         {options?.map((item, key) => (
//           <div
//             onClick={() => onSelect(item.value)}
//             key={key}
//             className={`w-24 flex items-center justify-center py-2  cursor-pointer ${
//               selected === item.value
//                 ? "bg-indigo-700 text-white"
//                 : "bg-white/10 text-black hover:bg-indigo-700 hover:text-white transition"
//             }`}
//           >
//             <p className="text-sm">{item.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
