"use client";

import { useSidebarCollapsed } from "@/context/SidebarContext";
import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

const ToggleSidebar = () => {
  const { setCollapsed } = useSidebarCollapsed();

  return (
    <button
      onClick={setCollapsed}
      className="absolute top-5 left-5 block md:hidden"
    >
      <HiOutlineBars3 className="w-8 h-8 text-neutral-800 dark:text-white" />
    </button>
  );
};

export default ToggleSidebar;
