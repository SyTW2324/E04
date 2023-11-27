import { create } from 'zustand';

type UserState = {
  user: Object,
  setUser: (user: Object) => void
};

export const useUserStore = create<UserState>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
}));