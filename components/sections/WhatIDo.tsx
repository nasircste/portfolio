import { Plus } from "lucide-react";
import { whatIDo } from "@/data/whatido";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

// Cards open on hover/focus (always open on touch screens)
export function WhatIDo() {
  return (
    <Section id="whatido" index="02" eyebrow="What I do" title="What I do">
      <ul className="grid gap-5 md:grid-cols-3">
        {whatIDo.map((card, i) => (
          <li key={card.title}>
            <Reveal delay={i * 0.08} className="h-full">
              <TiltCard>
                <article
                  tabIndex={0}
                  data-cursor
                  className="group/card relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-border bg-surface/80 p-7 outline-offset-4 backdrop-blur transition-colors hover:border-accent focus-visible:border-accent sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-6 inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-transform duration-300 group-hover/card:rotate-45 group-hover/card:text-accent group-focus-visible/card:rotate-45"
                  >
                    <Plus className="size-4" />
                  </span>
                  <p className="font-mono text-sm text-accent">0{i + 1}</p>
                  <h3 className="mt-4 text-3xl font-medium uppercase tracking-tight sm:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{card.summary}</p>

                  {/* Tools: collapsed by default on hover-capable screens */}
                  <div className="mt-6 grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-focus-visible/card:grid-rows-[1fr] [@media(hover:hover)]:group-hover/card:grid-rows-[1fr]">
                    <ul className="flex flex-wrap gap-2 overflow-hidden">
                      {card.tools.map((t) => (
                        <li key={t}>
                          <Chip>{t}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
