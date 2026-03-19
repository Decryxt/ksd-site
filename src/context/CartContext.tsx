import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ProductStatus = "active" | "coming-soon" | "sold-out" | "preorder";

type CartItem = {
  category: string;
  slug: string;
  title: string;
  price: number;
  status?: ProductStatus;
  preorderShipDate?: string;
  squareVariationId?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ksd_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart: CartContextValue["addToCart"] = (item, qty = 1) => {
    if (item.status === "coming-soon" || item.status === "sold-out") {
      return;
    }

    const safeQty = Math.max(1, Math.min(99, qty));

    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);

      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug
            ? {
                ...p,
                ...item,
                quantity: p.quantity + safeQty,
              }
            : p
        );
      }

      return [...prev, { ...item, quantity: safeQty }];
    });
  };

  const removeFromCart: CartContextValue["removeFromCart"] = (slug) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  };

  const setQty: CartContextValue["setQty"] = (slug, qty) => {
    const safeQty = Math.max(1, Math.min(99, qty));
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, quantity: safeQty } : p))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}