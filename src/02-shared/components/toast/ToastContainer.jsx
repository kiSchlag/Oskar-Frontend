import { useToast } from "@/02-shared/context";
import clsx from "clsx";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3 animate-slide-in-right min-w-[280px]",
            toast.type === "success" && "bg-green-800 text-white",
            toast.type === "error" && "bg-red-600 text-white",
            toast.type === "info" && "bg-accent text-white"
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100"
            aria-label="Dismiss"
          >
            &#x2715;
          </button>
        </div>
      ))}
    </div>
  );
}
