// All personal details live here. Edit this file, not the components.

export const profile = {
  name: "Nasir Ahmed",
  initials: "NA",
  title: "Full Stack Developer",
  location: "Bashundhara, Dhaka, Bangladesh",
  intro:
    "I build secure backend services with Java and Spring Boot, and the React and Next.js interfaces on top of them.",

  email: "nasircste15@gmail.com",
  github: "https://github.com/nasircste",
  // TODO: replace REPLACE_ME with your real LinkedIn profile slug before deploying.
  linkedin: "https://www.linkedin.com/in/REPLACE_ME",

  // Place these files in /public (resume.pdf, profile.jpg).
  resumeUrl: "/resume.pdf",
  photo: "/profile.jpg",

  objective:
    "Full Stack Developer with hands-on backend experience in Java, Spring Boot, REST API design, and microservice architecture, along with front-end experience in React and Next.js. Currently building a full-stack land management system using Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, Docker, React and Next.js. Strong foundation in Data Structures and Algorithms, demonstrated through solving 900+ problems across competitive programming platforms.",

  stats: [
    { value: "900+", label: "Problems solved" },
    { value: "50+", label: "Contests" },
    { value: "3.59/4.00", label: "CGPA" },
    { value: "2", label: "Roles" },
  ],
} as const;

// Production URL used for metadata, sitemap and OG tags.
// Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Coding", href: "#coding" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
