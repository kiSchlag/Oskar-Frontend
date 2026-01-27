import clsx from "clsx";

export function Card({ children, className, glowing, onClick, ...props }) {
  return (
    <div
      className={clsx(
        "bg-card border border-border rounded-xl overflow-hidden transition-all",
        glowing && "ring-2 ring-accent/50 border-accent/30",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
