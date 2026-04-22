This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Sanity CMS

Content is managed with Sanity. Schemas live in `sanity/schemas/` and map 1:1 to homepage sections.

### First-time setup

1. Create a project at [sanity.io/manage](https://sanity.io/manage) and copy the **Project ID**.
2. Copy env template and fill in values:
   ```bash
   cp .env.local.example .env.local
   # fill in NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
   ```
3. In the Sanity dashboard, add `http://localhost:3000` and your production URL to **API → CORS origins** (credentials allowed).
4. Run the dev server and open the embedded Studio:
   ```bash
   npm run dev
   # then visit http://localhost:3000/studio
   ```

### Schema map

| Homepage section            | Schema file                                             |
| --------------------------- | ------------------------------------------------------- |
| Hero                        | `sanity/schemas/objects/hero.ts`                        |
| Sobre Nosotros / Propósito  | `sanity/schemas/objects/aboutSection.ts`                |
| Stats (entregas, km…)       | `sanity/schemas/objects/statsSection.ts`                |
| Nuestros Servicios          | `sanity/schemas/objects/servicesSection.ts`             |
| Flota                       | `sanity/schemas/objects/fleetSection.ts`                |
| Testimonials                | `sanity/schemas/objects/testimonialsSection.ts`         |
| Preguntas Frecuentes        | `sanity/schemas/objects/faqSection.ts`                  |
| Últimas Notícias (teaser)   | `sanity/schemas/objects/blogSection.ts`                 |
| Blog Posts (repeatable)     | `sanity/schemas/documents/blogPost.ts`                  |
| Header / footer / socials   | `sanity/schemas/singletons/siteSettings.ts`             |
| Page composition            | `sanity/schemas/singletons/homePage.ts`                 |

### Fetching content in a page

```tsx
import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const data = await client.fetch(homePageQuery);
  return <Hero {...data.hero} />;
}
```

## Deploy to GitHub → Vercel

1. `git init && git add . && git commit -m "initial"`
2. Push to a new GitHub repo.
3. Import the repo on [vercel.com/new](https://vercel.com/new).
4. In Vercel → Project Settings → **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (typically `production`)
   - `NEXT_PUBLIC_SANITY_API_VERSION` (e.g. `2024-10-01`)
   - `SANITY_API_READ_TOKEN` (optional, for drafts)
5. Add your Vercel production URL to Sanity **CORS origins**.
6. Deploy. The Studio will be live at `https://your-domain.vercel.app/studio`.
