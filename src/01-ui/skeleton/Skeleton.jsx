import clsx from "clsx";

export function Skeleton({ className, variant = "rectangular" }) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-border",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4",
        variant === "rectangular" && "rounded-lg",
        className
      )}
    />
  );
}
