import { ToastProvider, FavoritesProvider } from "@/02-shared/context";
import AppRoutes from "./routes";

export default function App() {
  return (
    <ToastProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </ToastProvider>
  );
}
