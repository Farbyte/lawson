"use client";

import { motion } from "framer-motion";
import { useTabsStore } from "../../_store/tabsStore";

type Tab = {
  title: string;
};

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const { activeTab, setActiveTab } = useTabsStore();

  return (
    <div className="no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-center overflow-auto sm:overflow-visible">
      {tabs.map((tab) => (
        <button
          key={tab.title}
          onClick={() => setActiveTab(tab.title)}
          className="relative px-4 py-2"
        >
          {activeTab === tab.title && (
            <motion.div
              layoutId="clickedbutton"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="absolute inset-0 rounded-lg bg-gray-200 dark:bg-[#2F2F2F]"
            />
          )}
          <span className="relative block text-black dark:text-white capitalize">
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
};
