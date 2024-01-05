import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md dark:bg-gray-800 bg-gray-900/5",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
