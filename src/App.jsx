import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/02-shared/lib";
import { ToastProvider, FavoritesProvider } from "@/02-shared/context";
import AppRoutes from "./routes";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <FavoritesProvider>
          <AppRoutes />
        </FavoritesProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
