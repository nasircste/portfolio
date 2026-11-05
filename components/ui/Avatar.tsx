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

export function Avatar({ src, initials, alt, hasPhoto }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showPhoto = hasPhoto && !failed;

  return (
    <div className="relative size-48 overflow-hidden rounded-full border border-border bg-surface sm:size-60 md:size-72">
      {showPhoto ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 288px, (min-width: 640px) 240px, 192px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex size-full items-center justify-center text-6xl font-semibold tracking-tight text-accent sm:text-7xl"
        >
          {initials}
        </div>
      )}
    </div>
  );
}
