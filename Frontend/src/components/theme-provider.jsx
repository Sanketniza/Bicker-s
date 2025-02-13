"use client"; // For Next.js

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme as useNextTheme } from 'next-themes'

export const ThemeProvider = ({ children, ...props }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};

export const useTheme = () => {
    const { setTheme } = useNextTheme()
    return { setTheme }
}