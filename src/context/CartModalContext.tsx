import { createContext, useContext, useState, type ReactNode } from "react";

type CartModalContextType = {
  isOpenCart: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined,
);

export function CartModalProvider({ children }: { children: ReactNode }) {
  const [isOpenCart, setIsOpenCart] = useState(false);

  return (
    <CartModalContext.Provider
      value={{
        isOpenCart,
        openCart: () => setIsOpenCart(true),
        closeCart: () => setIsOpenCart(false),
      }}
    >
      {children}
    </CartModalContext.Provider>
  );
}

export function useCartModal() {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error("useCartModal must be used within CartModalProvider");
  }
  return context;
}
