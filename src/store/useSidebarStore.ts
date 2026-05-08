import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
      isMobileOpen: false,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      toggleMobileSidebar: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      closeMobileSidebar: () => set({ isMobileOpen: false }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
