import { Scale } from "lucide-react";
import Link from "next/link";

export default function Logo({
  type,
  colorTheme,
}: {
  type?: "iconAndText";
  colorTheme?: "light" | "dark";
}) {
  return (
    <Link href="/">
      <div className="items-center flex justify-center">
        <Scale
          className={`${colorTheme === "light" ? "text-white" : "text-blue-600"} w-5 h-5 ml-5`}
        />
        {type === "iconAndText" && (
          <h3
            className={`${
              colorTheme === "light" ? "text-white" : "text-gray-900"
            } tracking-loose mb-0 ml-2 pb-0 font-semibold text-xl`}
          >
            lawson.
          </h3>
        )}
      </div>
    </Link>
  );
}
