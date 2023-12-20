import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: Object,
  setUser: (user: Object) => void
};

export const useUserStore = create(persist(
  (set) => ({
    user: {},
    setUser: (user) => set({ user }),
  }),
  {
    name: 'user_storage', // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
));