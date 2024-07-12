"use client";

import { motion } from "framer-motion";
import { useTabsStore } from "../../_store/tabsStore";
import { useState } from "react";

type Tab = {
  title: string;
};

export const Tabs = ({
  tabs,
  disabled,
}: {
  tabs: Tab[];
  disabled?: boolean;
}) => {
  const { activeTab, setActiveTab } = useTabsStore();
  const [selectedTab, setSelectedTab] = useState("summary");
  return (
    <div className="no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-center overflow-auto sm:overflow-visible">
      {tabs.map((tab) => (
        <button
          key={tab.title}
          onClick={() =>
            !disabled ? setActiveTab(tab.title) : setSelectedTab(tab.title)
          }
          className="relative px-4 py-2"
        >
          {activeTab === tab.title ? (
            <motion.div
              layoutId="clickedbutton"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="absolute inset-0 rounded-lg bg-gray-200 dark:bg-[#2F2F2F]"
            />
          ) : disabled && selectedTab === tab.title ? (
            <motion.div
              layoutId="clickedbutton"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="absolute inset-0 rounded-lg bg-gray-200 dark:bg-[#2F2F2F]"
            />
          ) : null}
          <span className="relative block capitalize text-black dark:text-white">
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
};
