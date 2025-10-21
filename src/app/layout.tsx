"use client";

import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AlertProvider } from "@/context/AlertContext";
import GeneralModalSelector from "@/components/modal/GeneralModalSelector";
import { useGeneralModal } from "@/hooks/useGeneralModal";
import { SecureNavigationProvider } from "@/context/SecureNavigationContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { visible, type, close, onConfirm, onCancel } = useGeneralModal();

  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AlertProvider>
            <SecureNavigationProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </SecureNavigationProvider>

            <GeneralModalSelector
              toggle={close}
              visible={visible}
              type={type}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
