"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const Providers: React.FC<ProvidersProps> = ({ children, themeProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="system" attribute="class" {...themeProps}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
