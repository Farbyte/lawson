import { create } from "zustand";

type TabsStore = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useTabsStore = create<TabsStore>((set) => ({
  activeTab: "summary",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
