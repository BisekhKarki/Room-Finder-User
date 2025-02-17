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
    <div className={cn("flex items-center justify-around", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center" key={index}>
            <div
              className={cn(
                "rounded-full w-6 h-6 flex justify-center items-center transition",
                {
                  "bg-blue-400 text-white": index === activeItem,
                  "bg-gray-400 text-white": index > activeItem,
                  "bg-blue-700 text-white": index < activeItem,
                  "cursor-pointer": index <= activeItem,
                }
              )}
              {...(index < activeItem
                ? { onClick: () => setActiveItem(index) }
                : {})}
            >
              {index + 1}
            </div>
            <p>{item.label}</p>
          </div>
          {index !== items.length - 1 && (
            <div
              className={cn(
                `border h-0 w-full -mt-5 
            relative after:absolute after:left-0 after:top-0 
            after:border after:transition-all after:duration-300 
            after:ease-in`,
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
