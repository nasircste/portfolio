export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "One Direction Companies Limited",
    period: "Mar 2026 - Present",
    bullets: [
      "Developing Shimana, a full-stack land record and management platform built on a Java Spring Boot microservice architecture",
      "Designing and implementing secure RESTful APIs with Spring Security (JWT-based authentication and authorization) and Spring Data JPA/Hibernate for PostgreSQL persistence",
      "Containerizing backend services with Docker to ensure consistent local development and deployment environments",
    ],
  },
  {
    role: "Mobile Application Developer",
    company: "Software Lighthouse",
    period: "Dec 2025 - Feb 2026",
    bullets: [
      "Built a cross-platform mobile application using Flutter and Dart with RESTful API integration",
      "Focused on clean, maintainable code architecture, responsive UI/UX, and state management for a smooth user experience",
    ],
  },
];
