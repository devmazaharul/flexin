import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  name: string;
  email: string;
  isVerified: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
  authAdd: (user: UserData) => void;
  authRemove: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      authAdd: (user) => set({ isLoggedIn: true, user }),

      authRemove: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
