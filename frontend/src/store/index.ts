import { create } from "zustand";
import type { StoreState } from "../utilities/types";

//  export const user=create<StoreState>((set)=>({
// count:0,
// increment:()=>set((state)=>({count: state.count + 1})),
// decrement:()=>set((state)=>({count :state.count - 1}))
//  }))

const userData = localStorage.getItem("userstack");

const useStore = create<StoreState>((set) => ({
  theme: localStorage.getItem("theme") ?? "light",
  user: userData ? JSON.parse(userData) : null,

  setTheme: (value) => set({ theme: value }),
  setCredentails: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));

export default useStore;
