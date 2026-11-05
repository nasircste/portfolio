"use client";

import Image from "next/image";
import { useState } from "react";
import { HeroOrbit } from "@/components/three/HeroOrbit";

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
    <div className="relative isolate size-48 sm:size-60 md:size-72">
      {/* Soft accent glow behind the photo */}
      <div
        aria-hidden="true"
        className="bg-brand absolute -inset-6 -z-20 rounded-full opacity-30 blur-3xl"
      />
      <HeroOrbit />

      <div className="relative size-full overflow-hidden rounded-full border border-border bg-surface shadow-xl shadow-[#7c3aed]/20 ring-4 ring-background">
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
    </div>
  );
}
