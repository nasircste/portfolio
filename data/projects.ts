export type Project = {
  title: string;
  description: string;
  tech: string[];
  featured?: boolean;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Shimana",
    featured: true,
    description:
      "Full-stack land record and management platform on a Spring Boot microservice architecture.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "JPA/Hibernate",
      "PostgreSQL",
      "Docker",
      "React",
      "Next.js",
    ],
    // No public repo or live link on purpose (private work).
  },
  {
    title: "TutorialsNinja Test Automation (POM Framework)",
    description:
      "Maintainable Page Object Model test framework using Selenium WebDriver, Java, TestNG and Maven to validate registration, login and core e-commerce flows.",
    tech: ["Selenium", "Java", "TestNG"],
    github: "https://github.com/nasircste/tutorials-ninja-automation-java-pom",
  },
  {
    title: "Bank Management System",
    description:
      "Desktop-based banking application with account creation, balance management, deposit/withdrawal operations, and transaction tracking, using MySQL for secure data storage.",
    tech: ["Java Swing", "AWT", "MySQL"],
  },
  {
    title: "Online E-Learning Platform",
    description:
      "Online e-learning platform with user registration, course listing, content access, and progress tracking, using a responsive interface.",
    tech: ["HTML", "CSS", "PHP"],
  },
];
