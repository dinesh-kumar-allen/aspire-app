import Image from "next/image";
import React, { ReactNode } from "react";

interface AccordionProps {
  title: string;
  icon?: string;
  children: ReactNode;
  expanded: boolean;
  onClick: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  children,
  expanded,
  onClick,
}) => {
  return (
    <div className="mb-6">
      <div className="rounded-xl overflow-hidden border border-[#E5E9F2] mx-4 lg:mx-0">
        <button
          className={`w-full flex items-center justify-between px-4 lg:px-6 py-4 lg:py-6.5 bg-background-card shadow-sm focus:outline-none cursor-pointer`}
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            {icon && <Image src={icon} alt="icon" width={24} height={24} />}
            <span className="text-sm text-dark-blue">{title}</span>
          </div>
          <Image
            src={expanded ? "/up-arrow.svg" : "/down-arrow.svg"}
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
        {expanded && (
          <div className="bg-white border-t border-background-grey-light animate-fade-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
