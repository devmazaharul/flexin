import { appConfig } from '@/constant/app.config';
import { addToCartitems } from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
  cart: addToCartitems[];
  addToCart: (item: addToCartitems) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((i) => i.id !== id),
        });
      },

      clearCart: () => set({ cart: [] }),
      increment: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(appConfig.cartLimit.MAX, item.quantity + 1) }
              : item
          ),
        }),

      decrement: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(appConfig.cartLimit.MIN, item.quantity - 1) } // 👈 never go below 1
              : item
          ),
        }),
    }),

    {
      name: 'cart-storage', // localStorage key name
    }
  )
);
