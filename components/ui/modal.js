import { useAppContext } from "@/helpers/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Modal({ primaryColor, landscape }) {
  const context = useAppContext();
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const width =
      window?.frameElement?.offsetWidth || window?.innerHeight * 0.58;
    const height = window?.frameElement?.offsetHeight || window?.innerHeight;
    setDimensions({ x: width, y: height });
  }, []);

  if (!context.modal) return <div />;
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black/70 backdrop-blur flex items-center justify-center z-10">
      <div
        style={{ top: 0, transition: "0.25s all" }}
        className="relative h-[75%] w-[90%] bg-white  rounded-2xl top-[100%]"
      >
        <div
          style={{ backgroundColor: primaryColor }}
          className="absolute w-[80%] h-12  border-2 border-white left-[10%] -mt-4 rounded-full flex items-center justify-center"
        >
          <p className="custom-font text-3xl">{context?.modal?.title}</p>
        </div>
        <div
          className={`h-full w-full ${
            landscape ? "pt-4 pb-0" : "pt-12 pb-12"
          } px-4`}
        >
          <div
            className={`h-full w-full text-black flex flex-col items-center`}
          >
            {context?.modal?.contents}
          </div>
        </div>
        {context?.modal?.onClose && (
          <div className="absolute w-full flex justify-center">
            <div
              onClick={() => context?.modal?.onClose()}
              className="hover:opacity-80 border-4 flex items-center justify-center border-white transition absolute h-12 w-20 p-4 bg-red-500 -bottom-4 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
