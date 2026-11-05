"use client";

import { ArrowDownToLine, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";
import { RollText } from "@/components/ui/RollText";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu; page scroll is locked while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // let the menu unlock scrolling before we scroll
    window.setTimeout(() => scrollToId(href.slice(1)), 0);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-12"
      >
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="text-lg font-semibold tracking-tight"
          aria-label={`${profile.name}, back to top`}
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <a
          href={`mailto:${profile.email}`}
          className="hidden text-sm tracking-wide text-muted transition-colors hover:text-foreground 2xl:block"
        >
          {profile.email}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:text-foreground ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  <RollText>{link.label}</RollText>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            download
            className="hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent xl:inline-flex"
          >
            <ArrowDownToLine className="size-4" aria-hidden="true" />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

    </header>
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-8 sm:px-10">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block border-b border-border py-4 text-3xl font-medium uppercase tracking-tight ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-6">
              <a
                href={profile.resumeUrl}
                download
                className="bg-brand inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium"
              >
                <ArrowDownToLine className="size-4" aria-hidden="true" />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
