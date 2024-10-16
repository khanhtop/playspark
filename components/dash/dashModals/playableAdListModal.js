import { Card } from "flowbite-react";
import ModalSkin from "./modalSkin";
import { cloudinaryToReimage } from "@/helpers/reimage";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { playable_ads } from "@/helpers/playable_ads";

export default function PlayableAdsModal({ onClose, onAdd }) {
  return (
    <ModalSkin onClose={onClose} title="Select a playable ad">
      <div className="flex flex-col gap-2">
        {playable_ads?.map((item, key) => (
          <Card
            onClick={() => {
              onAdd(item);
            }}
            className="group hover:shadow-sm transition cursor-pointer"
          >
            <div className="flex gap-2">
              <div className="h-[120px] w-[120px] rounded-lg overflow-hidden flex-shrink-0 border-[1px] border-black/5">
                <img
                  src={cloudinaryToReimage(item.backgroundImage, "h-300")}
                  className="h-[120px] w-[120px] object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="line-clamp-3 text-sm ">{item.description}</p>
                </div>
                <div className="flex justify-end">
                  <div className="group-hover:flex items-center gap-1 hidden">
                    <p>Select</p>
                    <ArrowRightCircleIcon className="h-6 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ModalSkin>
  );
}
