"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  // Border under the navbar once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
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

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/85 backdrop-blur transition-colors ${
        scrolled || open ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="text-base font-semibold tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3 py-2 text-sm transition-colors hover:text-foreground ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
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

      {open && (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-3 sm:px-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block py-3 text-base ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
