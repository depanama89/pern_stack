import { create } from "zustand";
import type { StoreState } from "../utilities/types";

//  export const user=create<StoreState>((set)=>({
// count:0,
// increment:()=>set((state)=>({count: state.count + 1})),
// decrement:()=>set((state)=>({count :state.count - 1}))
//  }))

const userData = localStorage.getItem("user");

const useStore = create<StoreState>((set) => ({
  theme: localStorage.getItem("theme") ?? "light",
  user: userData ? JSON.parse(userData) : null,

  setTheme: (value) => {
    localStorage.setItem("theme", value);
    set({ theme: value });
  },
  setCredentails: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  signOut: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useStore;
