import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/04-layouts";
import { Spinner } from "@/01-ui";

const HomePage = lazy(() => import("@/05-pages/home-page"));
const JournalPage = lazy(() => import("@/05-pages/journal-page"));

function Fallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <Spinner size="lg" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
