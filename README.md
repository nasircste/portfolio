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
app/            layout, home page, /play (chess bot), global styles, OG image, favicon, robots, sitemap
components/
  layout/       Navbar, SocialRail, ThemeToggle, ScrollProgress, Footer
  sections/     Hero, About, WhatIDo, Experience, Projects (carousel), TechStack, Competitive,
                EducationResearch, CallToAction, Contact
  shell/        Loader (loading screen), Cursor (glow follower), SmoothScroll (Lenis + GSAP)
  three/        CharacterLayer (scroll choreography), CharacterScene (3D robot), characterState
  chess/        ChessGame (board UI)
  ui/           Section, Reveal, TiltCard, TechSphere (3D word sphere), SplitText, RollText, Avatar, ...
data/           all editable content
lib/            scroll helper, photo check, chess engine (+ web worker)
public/         profile.jpg, resume.pdf, models/robot.glb
```

## 3D and interaction

- **Hero robot:** a 3D character (react-three-fiber) that waves, follows your mouse, moves beside the About text while you scroll, then fades out.
  It only loads on large screens with a mouse and no reduced-motion preference. Phones, tablets and reduced-motion users see the profile photo instead
  (no three.js is downloaded for them).
- **Model:** `public/models/robot.glb` is "RobotExpressive" by Tomás Laulhé (CC0), from the three.js examples. To use your own character, replace the file
  (keep an animation named `Idle`, and a bone named `Head` if you want head tracking), and adjust the scroll choreography in `components/three/CharacterLayer.tsx`.
- **Tech stack:** a draggable 3D word sphere (plain DOM + transforms, no WebGL), with the same skills listed as normal text next to it.
- **Cards:** subtle 3D tilt and cursor spotlight on hover (mouse only).
- **Chess bot** (`/play`): chess.js plus a small alpha-beta engine in `lib/chess/`, running in a Web Worker. No server needed.

## Notes

- This Next.js version has `cacheComponents` enabled. Reading the current time during render needs `use cache`
  (see `components/layout/Footer.tsx`), and `app/sitemap.ts` uses a fixed `lastModified` date for the same reason.
- Animations respect `prefers-reduced-motion`.
