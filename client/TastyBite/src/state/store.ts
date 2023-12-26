import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: Object,
  setUser: (user: Object) => void
};

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000; // Two hours in milliseconds

export const useUserStore = create(persist(
  (set) => ({
    user: {},
    setUser: (user) => set({ user }),
  }),
  {
    name: 'user_storage', // unique name
    getStorage: () => localStorage, // (optional) by default 'localStorage' is used
    onRehydrate: (state) => {
      // Check if the stored user data has exceeded two hours
      const currentTime = new Date().getTime();
      const storedTime = state?.persist?.user?.time || 0;

      if (currentTime - storedTime > TWO_HOURS_IN_MS) {
        // Clear the user data if it's older than two hours
        state.setUser({});
      }
    },
  }
));
