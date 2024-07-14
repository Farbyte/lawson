import { Scale } from "lucide-react";
import Link from "next/link";

export default function Logo({
  type,
  colorTheme,
}: {
  type?: "iconAndText" | "icon";
  colorTheme?: "light" | "dark";
}) {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Scale
          className={`${colorTheme === "light" ? "text-white" : "text-blue-600"} ${type === "icon" ? "h-7 w-7" : "h-5 w-5"}`}
        />
        {type === "iconAndText" && (
          <h3
            className={`${
              colorTheme === "light" ? "text-white" : "text-gray-900"
            } tracking-loose mb-0 ml-2 pb-0 text-xl font-semibold`}
          >
            lawson.
          </h3>
        )}
      </div>
    </div>
  );
}
