import { create } from "zustand";

interface ICart {
  cart: any;
  setCart: (payload: any) => void;
}

export const useStore = create<ICart>()((set, get) => ({
  cart: [],
  setCart: async (payload) => {
    try {
      set({ cart: payload });
    } catch (error: any) {
      console.error(error);
    }
  },
}));
