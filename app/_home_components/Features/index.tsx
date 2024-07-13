import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { AlignCenter, Clipboard, File, MoveRight, SignalHighIcon, Table, TouchpadIcon } from "lucide-react";

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
          icon={item.icon}
          className={`p-4 border rounded-lg ${i === 3 || i === 6 ? "md:col-span-2" : ""}`}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <File className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <SignalHighIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <Table className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <MoveRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <TouchpadIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <AlignCenter className="h-4 w-4 text-neutral-500" />,
  },
];
