"use client";

import { create } from "zustand";

interface UIState {
  authModalOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  authModalOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
}));
