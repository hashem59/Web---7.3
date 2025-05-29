import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    slug: string;
    thumbnails: string[];
  };
  quantity: number;
}

interface CartContextType {
  cart: {
    items: CartItem[];
  } | null;
  cartCount: number;
  updateCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = async () => {
    try {
      const cartRequest = await fetch("/cart");
      const data = await cartRequest.json();
      setCart(data.cart);

      // Calculate total items
      const totalItems =
        data.cart?.items?.reduce(
          (sum: number, item: CartItem) => sum + (item?.quantity || 1),
          0
        ) || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
