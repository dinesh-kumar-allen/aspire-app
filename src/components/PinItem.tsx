import { IPinItem } from "@/app/types/pinItem";
import { memo } from "react";

const PinItem = memo(
  (props: IPinItem) => {
    const { imageData, title, description } = props;

    return (
      <div className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <img
          loading="lazy"
          src={imageData.url}
          width={imageData.width}
          height={imageData.height}
          alt={title}
          className="w-full h-auto object-cover bg-gray-200"
          style={{ aspectRatio: `${imageData.width}/${imageData.height}` }}
        />
        <div className="flex flex-col p-3 space-y-2">
          <h2 className="font-semibold text-sm text-gray-900 line-clamp-2">{title}</h2>
          <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
        </div>
      </div>
    );
  }
);

PinItem.displayName = "PinItem";

export default PinItem;
