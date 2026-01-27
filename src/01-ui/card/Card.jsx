import clsx from "clsx";

export function Card({ children, className, glowing, onClick, ...props }) {
  return (
    <div
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
}
