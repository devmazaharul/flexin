// stores/useWishStore.ts
import { productItems } from '@/types/product';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


type WishState = {
  wishlist: productItems[];
  add: (item: productItems) => void;
  remove: (id: string) => void;
  toggle: (item: productItems) => void;
  clear: () => void;
  isInWishlist: (id: string) => boolean;
  count: () => number;
};

export const useWishStore = create<WishState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      add: (item) => {
        const exists = get().wishlist.some((i) => i.id === item.id);
        if (exists) return;
        set((state) => ({
          wishlist: [{ ...item, addedAt: Date.now() }, ...state.wishlist],
        }));
      },

      remove: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.id !== id),
        }));
      },

      toggle: (item) => {
        const exists = get().wishlist.some((i) => i.id === item.id);
        if (exists) {
          get().remove(item.id);
        } else {
          get().add(item);
        }
      },

      clear: () => set({ wishlist: [] }),

      isInWishlist: (id) => get().wishlist.some((i) => i.id === id),

      count: () => get().wishlist.length,
    }),
    {
      name: 'flexin:wishlist',
    }
  )
);

export default useWishStore;
