// components/AlertContext.tsx
"use client";

import Alert from "@/components/ui/alert/Alert";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertOptions {
  title?: string;
  duration?: number;
  linkHref?: string;
  linkText?: string;
  showLink?: boolean;
}

interface AlertContextType {
  success: (message: string, options?: AlertOptions) => void;
  error: (message: string, options?: AlertOptions) => void;
  warning: (message: string, options?: AlertOptions) => void;
  info: (message: string, options?: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    variant: AlertType;
    title: string;
    message: string;
    show: boolean;
    showLink?: boolean;
    linkHref?: string;
    linkText?: string;
  } | null>(null);

  const showAlert = (
    variant: AlertType,
    message: string,
    options?: AlertOptions
  ) => {
    setAlert({
      variant,
      title: options?.title ?? variant.toUpperCase(),
      message,
      show: true,
      showLink: options?.showLink,
      linkHref: options?.linkHref,
      linkText: options?.linkText,
    });

    const timeout = options?.duration ?? 3000;
    setTimeout(() => {
      setAlert(null);
    }, timeout);
  };

  const value: AlertContextType = {
    success: (msg, opts) => showAlert("success", msg, opts),
    error: (msg, opts) => showAlert("error", msg, opts),
    warning: (msg, opts) => showAlert("warning", msg, opts),
    info: (msg, opts) => showAlert("info", msg, opts),
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alert?.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] max-w-sm">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            showLink={alert.showLink}
            linkHref={alert.linkHref}
            linkText={alert.linkText}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};
