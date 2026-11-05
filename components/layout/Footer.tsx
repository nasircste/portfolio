import { cacheLife } from "next/cache";
import Link from "next/link";
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
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-24">
        <p>
          &copy; <CopyrightYear /> {profile.name}. All rights reserved.
        </p>
        <p>{profile.location}</p>
        <Link href="/play" className="transition-colors hover:text-accent">
          Play chess bot
        </Link>
      </div>
      <p className="mx-auto max-w-[1400px] px-5 pb-6 text-xs text-muted/70 sm:px-10 lg:px-24">
        3D robot: &ldquo;RobotExpressive&rdquo; by Tomás Laulhé (CC0), via the three.js examples.
      </p>
    </footer>
  );
}
