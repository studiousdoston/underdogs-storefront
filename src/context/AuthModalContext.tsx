import { createContext, useContext, useState, type ReactNode } from "react";

type AuthModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
