import { forwardRef } from "react";
import clsx from "clsx";

export const Card = forwardRef(function Card(
  { children, className, glowing, onClick, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "bg-card border border-border rounded-xl overflow-hidden transition-all",
        glowing && "drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});
