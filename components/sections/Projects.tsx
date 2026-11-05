import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Chip } from "@/components/ui/Chip";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Section } from "@/components/ui/Section";

export function Projects() {
  // With an odd number of regular cards, let the last one span the full row
  const oddRest = projects.filter((p) => !p.featured).length % 2 === 1;

  return (
    <Section id="projects" index="03" eyebrow="Projects" title="Things I have built">
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <li
            key={project.title}
            className={
              project.featured || (oddRest && i === projects.length - 1)
                ? "md:col-span-2"
                : undefined
            }
          >
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <TiltCard>
              <article
                className={`flex h-full flex-col rounded-2xl border bg-surface transition-colors hover:border-accent ${
                  project.featured
                    ? "border-accent/50 p-7 sm:p-10"
                    : "border-border p-6 sm:p-7"
                }`}
              >
                {project.featured && (
                  <p className="bg-brand mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    Featured
                  </p>
                )}
                <h3
                  className={`font-semibold tracking-tight ${
                    project.featured ? "text-3xl sm:text-4xl" : "text-xl"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-muted ${
                    project.featured ? "max-w-2xl text-lg" : ""
                  }`}
                >
                  {project.description}
                </p>

                <ul
                  aria-label={`${project.title} technologies`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {project.tech.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>

                {(project.github || project.live) && (
                  <div className="mt-6 flex flex-wrap gap-4 pt-1 text-sm font-medium">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-accent"
                      >
                        <GitHubIcon className="size-4" />
                        GitHub
                        <span className="sr-only">
                          repository for {project.title}
                        </span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-accent"
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                        Live
                        <span className="sr-only">site for {project.title}</span>
                      </a>
                    )}
                  </div>
                )}
              </article>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
