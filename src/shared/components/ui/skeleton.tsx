import { cn } from "@/shared/utils";
import { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-zinc-700/40 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
