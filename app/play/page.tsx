import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ChessGame } from "@/components/chess/ChessGame";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Chess bot",
  description: `Play chess against a small engine that runs in your browser. Built by ${profile.name}.`,
  alternates: { canonical: "/play" },
  openGraph: { url: "/play" },
};

export default function PlayPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-10 lg:px-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-10 sm:py-14 lg:px-24">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Take a break</p>
        <h1 className="mt-3 text-4xl font-medium uppercase tracking-tight sm:text-5xl">Chess bot</h1>
        <p className="mt-3 max-w-xl text-muted">
          Click a piece, then a highlighted square. You play White by default.
        </p>
        <div className="mt-10">
          <ChessGame />
        </div>
      </main>
    </>
  );
}
