"use client";

import Image from "next/image";
import { useState } from "react";

type AvatarProps = {
  src: string;
  initials: string;
  alt: string;
  // Decided on the server (whether the file exists in /public) so the
  // placeholder shows immediately, without waiting for an image error.
  hasPhoto: boolean;
};

// Round profile photo with a soft glow. Falls back to initials when the file is missing.
export function Avatar({ src, initials, alt, hasPhoto }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showPhoto = hasPhoto && !failed;

  return (
    <div className="relative isolate size-52 sm:size-64">
      <div
        aria-hidden="true"
        className="bg-brand absolute -inset-6 -z-20 rounded-full opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="glow-ring absolute -inset-4 -z-10 rounded-full"
      />
      <div className="relative size-full overflow-hidden rounded-full border border-border bg-surface ring-4 ring-background">
        {showPhoto ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 640px) 256px, 208px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="flex size-full items-center justify-center text-6xl font-semibold tracking-tight text-accent"
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
