import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { File, MessageCircle } from "lucide-react";

export default function Features() {
  return (
    <div className="mx-auto mt-40 max-w-7xl px-10">
      <div>
        <h2 className="text-4xl sm:text-6xl">
          Features <br />
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          Lawson has a lot of features that make it easy to use and productive.
        </p>
        <BentoGridDemo />
      </div>
    </div>
  );
}

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto mt-8">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={`p-4 border rounded-lg`}
        />
      ))}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );

const Summary = () => (
  <div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 flex items-center justify-center"><div><File className="h-16 w-16 text-neutral-500" /></div></div>
);

const Chat = () => (
  <div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 flex items-center justify-center"><div><MessageCircle className="h-16 w-16 text-neutral-500" /></div></div>
);

const WorkInProgress = () => (
  <div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 flex items-center justify-center text-neutral-500 text-2xl"><div>Work in progress</div></div>
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
    description: "Search for relevant information using semantic search on supreme court judements from 1985.",
    header: <WorkInProgress />,
  },
];
