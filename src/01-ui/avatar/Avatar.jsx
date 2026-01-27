import clsx from "clsx";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
};

export function Avatar({ src, alt = "", size = "md", className }) {
  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden bg-border flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="font-medium text-text-muted">
          {alt
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      )}
    </div>
  );
}
