// context/ModuleContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface SecureNavigationContextType {
  params: any;
  setParams: (module: any) => void;
}

const SecureNavigationContext = createContext<
  SecureNavigationContextType | undefined
>(undefined);

export const SecureNavigationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [params, setParams] = useState<any>(null);

  return (
    <SecureNavigationContext.Provider value={{ params, setParams }}>
      {children}
    </SecureNavigationContext.Provider>
  );
};

export const useSecureNavigation = () => {
  const context = useContext(SecureNavigationContext);
  if (!context)
    throw new Error(
      "useSecureNavigation must be used inside SecureNavigationProvider"
    );
  return context;
};
