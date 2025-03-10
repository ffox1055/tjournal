import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  isFormLoading: boolean;
  setIsLoading: (load: boolean) => void;
  setIsFormLoading: (load: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  isFormLoading: false,

  setIsLoading: (load: boolean) => set({ isLoading: load }),
  setIsFormLoading: (load: boolean) => set({ isFormLoading: load }),
}));

export default useLoadingStore;
