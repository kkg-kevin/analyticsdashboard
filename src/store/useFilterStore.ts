import { create } from 'zustand';

interface FilterStore {
  dateRange: { from: Date; to: Date };
  searchQuery: string;
  selectedRole: string | null;
  selectedStatus: string | null;
  selectedCenter: string | null;
  setDateRange: (range: { from: Date; to: Date }) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRole: (role: string | null) => void;
  setSelectedStatus: (status: string | null) => void;
  setSelectedCenter: (center: string | null) => void;
  resetFilters: () => void;
}

const defaultDateRange = {
  from: new Date(new Date().setDate(new Date().getDate() - 90)),
  to: new Date(),
};

export const useFilterStore = create<FilterStore>((set) => ({
  dateRange: defaultDateRange,
  searchQuery: '',
  selectedRole: null,
  selectedStatus: null,
  selectedCenter: null,
  setDateRange: (range) => set({ dateRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSelectedCenter: (center) => set({ selectedCenter: center }),
  resetFilters: () =>
    set({
      dateRange: defaultDateRange,
      searchQuery: '',
      selectedRole: null,
      selectedStatus: null,
      selectedCenter: null,
    }),
}));
