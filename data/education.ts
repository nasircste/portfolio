export type Education = {
  institution: string;
  degree: string;
  period: string;
  score: string;
};

export const education: Education[] = [
  {
    institution: "Noakhali Science and Technology University",
    degree:
      "B.Sc. (Engg.) in Computer Science and Telecommunication Engineering",
    period: "2020 - 2025",
    score: "CGPA 3.59 / 4.00",
  },
  {
    institution: "Tangail College",
    degree: "Higher Secondary Certificate",
    period: "2019",
    score: "GPA 4.67 / 5.00",
  },
  {
    institution: "Karimun-Nesa Siddique High School",
    degree: "Secondary School Certificate",
    period: "2017",
    score: "GPA 4.68 / 5.00",
  },
];

export const research = {
  label: "Thesis",
  title:
    "Enhancing Email Security: A Multi-Layered Machine Learning Model for Detecting Spam and Mitigating Email Bombing Attacks",
  bullets: [
    "Built dataset using Python & SMTP simulations to study subscription email bombing attacks",
    "Designed a multi-layered detection model (time-based filter, sender-domain classifier, ML model) with high precision and minimal false positives",
  ],
};

export const languages = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Professional Proficiency" },
];
