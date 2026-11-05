# Nasir Ahmed | Portfolio

Single-page developer portfolio built with Next.js (App Router, TypeScript), Tailwind CSS and Framer Motion.
Light and dark theme, fully responsive, no backend.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start   # production build
```

Requires Node.js 20.9 or newer.

## Edit content

All text lives in typed files under [`data/`](data). You should not need to touch components.

| File | What it controls |
| --- | --- |
| `data/profile.ts` | Name, title, location, intro, email, GitHub and LinkedIn links, career objective, stat chips, nav links |
| `data/experience.ts` | Experience timeline |
| `data/projects.ts` | Project cards (`featured: true` makes the large first card) |
| `data/skills.ts` | Skill groups |
| `data/competitive.ts` | Platform stats, "also solved on" list, achievements |
| `data/education.ts` | Education, thesis, spoken languages |

## Before you deploy (checklist)

1. **LinkedIn**: replace `REPLACE_ME` in `data/profile.ts` (search for `TODO`).
2. **Photo**: add `public/profile.jpg`. Until it exists, an initials avatar is shown.
3. **Resume**: add `public/resume.pdf` (the "Download Resume" button links to it).
4. **Site URL** (optional): set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourname.com`) in Vercel if you add a custom domain. Without it, Vercel's production URL is used automatically for the Open Graph and sitemap URLs.

## Deploy to Vercel

1. Push this repo to GitHub (public).
2. Go to <https://vercel.com/new>, sign in with GitHub and import the repo.
3. Keep the defaults (framework preset: Next.js, no environment variables needed) and click **Deploy**.
4. Every later `git push` to `main` redeploys automatically.
5. Optional: add a custom domain under Project Settings > Domains.

After deploying, test the link preview with the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) (it caches previews, so re-inspect after changes).

## Project structure

```
app/            layout, page, global styles, OG image, favicon, robots, sitemap
components/
  layout/       Navbar, ThemeToggle, Footer
  sections/     Hero, About, Experience, Projects, Skills, Competitive, EducationResearch, Contact
  ui/           Section, Reveal (scroll animation), Chip, Avatar, brand icons
data/           all editable content
public/         profile.jpg and resume.pdf (you add these)
```

## Notes

- This Next.js version has `cacheComponents` enabled. Reading the current time during render needs `use cache`
  (see `components/layout/Footer.tsx`), and `app/sitemap.ts` uses a fixed `lastModified` date for the same reason.
- Animations respect `prefers-reduced-motion`.
