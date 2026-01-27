import { Avatar, Badge } from "@/01-ui";
import { profileUrl } from "@/02-shared/constants";

export function PersonCard({ person }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 shrink-0 w-32">
      <Avatar
        src={profileUrl(person.profile_path)}
        alt={person.name}
        size="lg"
      />
      <p className="text-text text-sm font-medium text-center truncate w-full">
        {person.name}
      </p>
      {person.known_for_department && (
        <Badge>{person.known_for_department}</Badge>
      )}
    </div>
  );
}
