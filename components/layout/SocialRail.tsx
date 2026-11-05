import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const link =
  "inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent";

// Vertical social icons fixed to the left edge on large screens
export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:left-8"
    >
      <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={link}>
        <GitHubIcon className="size-6" />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={link}>
        <LinkedInIcon className="size-6" />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email" className={link}>
        <Mail className="size-6" aria-hidden="true" />
      </a>
      <span aria-hidden="true" className="mt-2 h-16 w-px bg-border" />
    </aside>
  );
}
