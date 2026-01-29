import { Card, Badge, Avatar, Skeleton } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { posterUrl, profileUrl } from "@/02-shared/constants";
import { useMediaCredits } from "@/02-shared/hooks";
import {
  formatDate,
  formatRating,
  formatRuntime,
  formatSeasons,
} from "@/02-shared/utils";

function CastSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <Skeleton variant="circular" className="w-8 h-8" />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" className="w-16 h-3" />
            <Skeleton variant="text" className="w-12 h-2.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CastMember({ actor }) {
  const profileSrc = profileUrl(actor.profile_path, "w185");

  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <Avatar src={profileSrc} alt={actor.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text truncate leading-tight">{actor.name}</p>
        <p className="text-[10px] text-text-muted truncate leading-tight">
          {actor.character}
        </p>
      </div>
    </div>
  );
}

function CastGrid({ cast }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {cast.map((actor) => (
        <CastMember key={actor.id} actor={actor} />
      ))}
    </div>
  );
}

export function ChatMediaCard({
  recommendation,
  isFavorited,
  onToggleFavorite,
}) {
  const {
    media_type,
    media_id,
    title,
    poster_path,
    vote_average,
    release_date,
    genres,
    runtime,
    number_of_seasons,
  } = recommendation;

  const { cast, loading } = useMediaCredits(media_type, media_id, true);

  const imgSrc = posterUrl(poster_path, "w342");
  const year = formatDate(release_date);
  const rating = formatRating(vote_average);
  const duration =
    media_type === "movie"
      ? formatRuntime(runtime)
      : formatSeasons(number_of_seasons);
  const displayGenres = (genres || []).slice(0, 2);

  return (
    <Card
      glowing={isFavorited}
      onClick={onToggleFavorite}
      className="cursor-pointer w-full max-w-md"
    >
      <div className="flex">
        {/* Left Column - Poster */}
        <div className="w-28 shrink-0 relative min-h-[168px]">
          <LazyImage
            src={imgSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Column - Details */}
        <div className="flex-1 p-3 flex flex-col min-w-0 gap-2">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h4 className="text-text font-semibold text-sm leading-tight truncate">
                {title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                {year && <span>{year}</span>}
                {duration && (
                  <>
                    <span className="text-text-muted/50">·</span>
                    <span>{duration}</span>
                  </>
                )}
              </div>
            </div>
            {vote_average > 0 && (
              <div className="shrink-0 flex items-center gap-0.5">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-text text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            <Badge className="capitalize">{media_type}</Badge>
            {displayGenres.map((genre) => (
              <Badge key={genre} variant="default" className="text-[10px]">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Cast Grid */}
          <div className="mt-auto min-h-[76px]">
            {loading ? (
              <CastSkeleton />
            ) : cast && cast.length > 0 ? (
              <CastGrid cast={cast.slice(0, 4)} />
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
