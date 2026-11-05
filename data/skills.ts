export type SkillGroup = {
  category: string;
  // Maps to an icon in components/sections/Skills.tsx
  icon: "code" | "server" | "layout" | "smartphone" | "database" | "wrench";
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["Java", "C", "C++", "Dart", "Go"],
  },
  {
    category: "Backend",
    icon: "server",
    items: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA/Hibernate",
      "REST API",
      "Microservices",
    ],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Mobile",
    icon: "smartphone",
    items: ["Flutter", "Dart"],
  },
  {
    category: "Database",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "SQL Server"],
  },
  {
    category: "Tools & Platforms",
    icon: "wrench",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Maven",
      "Postman",
      "VS Code",
      "Antigravity",
      "IntelliJ IDEA",
    ],
  },
];
