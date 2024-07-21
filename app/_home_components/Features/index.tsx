import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { File, MessageCircle } from "lucide-react";

export default function Features() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-10">
      <div>
        <h2 className="text-3xl sm:text-4xl">
          Features <br />
        </h2>
        <p className="mt-3 max-w-2xl text-base text-gray-700 dark:text-gray-300">
          Lawson has a lot of features that make it easy to use and productive.
        </p>
        <BentoGridDemo />
      </div>
    </div>
  );
}

export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto mt-8 max-w-7xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={`rounded-lg border p-4`}
        />
      ))}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );

const Summary = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
    <div>
      <File className="h-16 w-16 text-neutral-500" />
    </div>
  </div>
);

const Chat = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
    <div>
      <MessageCircle className="h-16 w-16 text-neutral-500" />
    </div>
  </div>
);

const WorkInProgress = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 text-2xl text-neutral-500 dark:from-neutral-900 dark:to-neutral-800">
    <div>Work in progress</div>
  </div>
);

const items = [
  {
    title: "One Click Summary",
    description: "Generate summary of your judgements in one click.",
    header: <Summary />,
  },
  {
    title: "Chat with your Judgement",
    description: "Chat with your judgements and get personalized feedback.",
    header: <Chat />,
  },
  {
    title: "Semantic Search",
    description:
      "Search for relevant information using semantic search on supreme court judements from 1985.",
    header: <WorkInProgress />,
  },
];
