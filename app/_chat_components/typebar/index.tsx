"use client";

import { Tabs } from "./tabs";

export function Typebar({disabled} : {disabled?: boolean}) {
  const tabs = [
    {
      title: "summary",
      disabled: false,
    },
    {
      title: "chat",
      disabled: false,
    },
    {
      title: "semantic search",
      disabled: true,
    },
  ];

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center">
      <Tabs tabs={tabs} disabled={disabled} />
    </div>
  );
}
