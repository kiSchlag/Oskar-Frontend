import { Outlet } from "react-router-dom";
import { Navbar } from "@/02-shared/components/navbar";
import { ToastContainer } from "@/02-shared/components/toast";
import { ErrorBoundary } from "@/02-shared/components/error-boundary";
import { ChatWidget } from "@/03-features/chat";

export function MainLayout() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <ChatWidget />
      <ToastContainer />
    </ErrorBoundary>
  );
}
