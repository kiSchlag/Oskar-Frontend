import { Skeleton } from "@/01-ui";

export function MediaCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" />
    </div>
  );
}
