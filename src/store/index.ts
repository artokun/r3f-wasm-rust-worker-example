import create from "zustand";

type State = { open: boolean; toggleOpen: () => void };

export const useStore = create<State>((set) => ({
  open: false,

  toggleOpen: () => set((state) => ({ open: !state.open })),
}));
