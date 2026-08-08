"use client";

import { create } from "zustand";
import { Product, CartItem } from "../lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, variantId, quantity = 1) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.variantId === variantId,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.variantId === variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { product, variantId, quantity }],
      };
    });
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (i) => i.product.id !== productId || i.variantId !== variantId,
      ),
    }));
  },

  updateQuantity: (productId, variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, variantId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i,
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  setOpen: (open) => set({ isOpen: open }),

  totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
}));
