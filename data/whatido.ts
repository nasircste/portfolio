import { skills } from "./skills";

const items = (category: string) =>
  skills.find((g) => g.category === category)?.items ?? [];

export type WhatIDo = {
  title: string;
  summary: string;
  tools: string[];
};

// Short summaries are taken from your career objective and experience.
export const whatIDo: WhatIDo[] = [
  {
    title: "Backend",
    summary:
      "Hands-on backend experience in Java, Spring Boot, REST API design, and microservice architecture.",
    tools: items("Backend"),
  },
  {
    title: "Frontend",
    summary: "Front-end experience in React and Next.js.",
    tools: items("Frontend"),
  },
  {
    title: "Mobile",
    summary:
      "Cross-platform mobile application built with Flutter and Dart, with RESTful API integration.",
    tools: items("Mobile"),
  },
];
