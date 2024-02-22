"use client";

import { createContext, useContext, useState } from "react";

interface SidebarType {
  collapsed: boolean;
  setCollapsed: () => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext({} as SidebarType);

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleSetCollapsed = () => setCollapsed(!collapsed);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed: handleSetCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarCollapsed = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("something went wrong!");
  return context;
};

export default SidebarProvider;
