import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  items: { label: string }[];
  activeItem: number;
  setActiveItem: (index: number) => void;
  className?: string;
}

const Stepper = ({ items, activeItem, setActiveItem, className }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between md:justify-around gap-2",
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-1" key={index}>
            <div
              className={cn(
                "rounded-full w-5 h-5 md:w-6 md:h-6 flex justify-center items-center transition text-sm md:text-base",
                {
                  "bg-blue-400 text-white": index === activeItem,
                  "bg-gray-400 text-white": index > activeItem,
                  "bg-blue-700 text-white": index < activeItem,
                  "cursor-pointer": index <= activeItem,
                  "hover:bg-blue-600": index < activeItem,
                }
              )}
              {...(index < activeItem
                ? { onClick: () => setActiveItem(index) }
                : {})}
            >
              {index + 1}
            </div>
            <p className="text-xs md:text-sm text-center mt-1 hidden md:block">
              {item.label}
            </p>
            {/* Mobile-only label */}
            <p className="text-[10px] text-center mt-1 md:hidden whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[50px]">
              {item.label}
            </p>
          </div>
          {index !== items.length - 1 && (
            <div
              className={cn(
                `border h-0 w-full -mt-5 mx-1
              relative after:absolute after:left-0 after:top-0 
              after:border after:transition-all after:duration-300 
              after:ease-in after:border-gray-300`,
                {
                  "after:w-full after:border-blue-400": index < activeItem,
                  "after:w-0": index >= activeItem,
                }
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
