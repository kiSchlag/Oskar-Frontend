import { Link } from "react-router-dom";
import { Button } from "@/01-ui";
import { HOME } from "@/02-shared/constants";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-6 opacity-30">🎬</div>
      <h2 className="text-xl font-semibold text-text mb-2">
        Your journal is empty
      </h2>
      <p className="text-text-muted mb-6 max-w-md">
        Start exploring movies and TV shows, and save your favorites here to
        build your personal viewing journal.
      </p>
      <Link to={HOME}>
        <Button>Explore Content</Button>
      </Link>
    </div>
  );
}
