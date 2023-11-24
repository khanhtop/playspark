import { useAppContext } from "@/helpers/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Modal({ primaryColor }) {
  const context = useAppContext();
  const [show, setShow] = useState(false);
  //   useEffect(() => {
  //     if (context.modal) {
  //       setTimeout(() => {
  //         setShow(true);
  //       }, 250);
  //     }
  //   }, [context.modal]);

  if (!context.modal) return <div />;
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black/70 backdrop-blur flex items-center justify-center">
      <div
        style={{ top: 0, transition: "0.25s all" }}
        className="relative h-[70%] w-[90%] bg-white mb-[20%] rounded-2xl top-[100%]"
      >
        <div
          style={{ backgroundColor: primaryColor }}
          className="absolute w-[80%] h-12  border-2 border-white left-[10%] -mt-4 rounded-full flex items-center justify-center"
        >
          <p className="font-octo text-2xl">{context?.modal?.title}</p>
        </div>
        <div className="h-full w-full pt-12 pb-12 px-4">
          <div className="h-full w-full text-black flex flex-col items-center">
            {context?.modal?.contents}
          </div>
        </div>
        {context?.modal?.onClose && (
          <div className="absolute w-full flex justify-center">
            <div
              onClick={() => context?.modal?.onClose()}
              className="hover:opacity-80 border-4 border-white transition absolute h-20 w-20 p-4 bg-red-500 -bottom-10 rounded-full"
            >
              <XMarkIcon className="h-full w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
