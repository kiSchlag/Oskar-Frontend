import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export function Modal({ isOpen, onClose, title, children, className }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={clsx(
          "relative bg-card border border-border rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text transition-colors"
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
