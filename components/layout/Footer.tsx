import { cacheLife } from "next/cache";
import { profile } from "@/data/profile";

// `use cache` lets us read the current date during prerender (required with
// cacheComponents) while still refreshing the year automatically.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; <CopyrightYear /> {profile.name}. All rights reserved.
        </p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
