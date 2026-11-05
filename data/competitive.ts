export type Platform = {
  name: string;
  handle: string;
  solved: number;
  rating?: string;
  url: string;
};

export const competitiveSummary = {
  totalProblems: "900+",
  contests: "50+",
  contestsNote: "online and onsite contests",
};

export const platforms: Platform[] = [
  {
    name: "Codeforces",
    handle: "Nasir",
    solved: 465,
    rating: "Max rating 1188",
    url: "https://codeforces.com/profile/Nasir",
  },
  {
    name: "CodeChef",
    handle: "nasir_cste",
    solved: 59,
    rating: "Max rating 1444 (2 star)",
    url: "https://www.codechef.com/users/nasir_cste",
  },
  {
    name: "LeetCode",
    handle: "nasircste15",
    solved: 189,
    url: "https://leetcode.com/u/nasircste15",
  },
  {
    name: "GeeksforGeeks",
    handle: "nasircste15",
    solved: 104,
    url: "https://www.geeksforgeeks.org/user/nasircste15",
  },
];

export const alsoSolvedOn = ["LightOJ", "SPOJ", "CSES", "HackerRank"];

export type Achievement = { place: string; event: string };

export const achievements: Achievement[] = [
  { place: "9th Place", event: "Intra NSTU Programming Contest 2021" },
  {
    place: "14th Place",
    event: "CUSS Presents IT Fiesta 2024 Inter University Programming Contest",
  },
  { place: "624th Place", event: "ICPC Preliminary Dhaka Site 2024" },
];
