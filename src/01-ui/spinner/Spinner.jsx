import clsx from "clsx";

const sizes = {
  sm: "h-4 w-4 border",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-2",
};

export function Spinner({ size = "md", className }) {
  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-accent border-t-transparent",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
