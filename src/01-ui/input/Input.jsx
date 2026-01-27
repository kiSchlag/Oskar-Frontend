import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full bg-darker border border-border rounded-lg px-4 py-2 text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors",
        className
      )}
      {...props}
    />
  );
});
