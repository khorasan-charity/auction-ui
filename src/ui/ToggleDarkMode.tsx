"use client";

import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

interface ToggleDarkModeProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: twMerge(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: twMerge(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected ? (
          <HiOutlineSun className="w-6 h-6" />
        ) : (
          <HiOutlineMoon className="w-6 h-6" />
        )}
      </div>
    </Component>
  );
};

export default ToggleDarkMode;
