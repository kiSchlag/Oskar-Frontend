import { Avatar, Skeleton } from "@/01-ui";
import { profileUrl } from "@/02-shared/constants";

export function CastStrip({ cast, loading, maxVisible = 5 }) {
  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {Array.from({ length: maxVisible }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[48px]">
            <Skeleton variant="circular" className="h-10 w-10" />
            <Skeleton variant="text" className="w-10 h-3" />
          </div>
        ))}
      </div>
    );
  }

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
      {cast.slice(0, maxVisible).map((actor) => (
        <div
          key={actor.id}
          className="flex flex-col items-center gap-1 min-w-[48px]"
        >
          <Avatar
            src={profileUrl(actor.profile_path)}
            alt={actor.name}
            size="md"
          />
          <span className="text-xs text-text-muted truncate w-full text-center">
            {actor.name.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
