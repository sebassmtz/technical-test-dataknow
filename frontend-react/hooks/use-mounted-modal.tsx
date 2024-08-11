import { create } from "zustand";

interface UploadModalStore {
  isMounted: boolean;
  setIsMounted: () => void;
}

export const useMountedModal = create<UploadModalStore>((set) => ({
  isMounted: false,
  setIsMounted: () => set({ isMounted: true }),
}));