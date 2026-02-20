# Java for JS Devs

Interactive course teaching Java through the lens of JavaScript — side-by-side code comparisons, fill-in-the-blank challenges, quizzes, and hands-on projects.

## Features

- **4 modules**: Basic Syntax & Types, OOP, Collections, Spring
- **20 lessons** with JS vs Java code comparisons
- **4 quizzes** with progress tracking
- **Hands-on mini-projects** per module
- **Bilingual support** (English, Spanish) via i18next
- **Auth** via Clerk (login, SSO)
- **Progress persistence** with Drizzle ORM + Neon Postgres

## Tech Stack

- **Framework**: Next.js 15, React 19
- **Auth**: Clerk
- **Database**: Neon Postgres + Drizzle ORM
- **Styling**: Tailwind CSS
- **i18n**: i18next, react-i18next
- **UI**: Framer Motion, Lucide icons, react-syntax-highlighter

## Getting Started

**Prerequisites**: Node.js, npm

**Install**:

```bash
npm install
```

**Environment**: Copy `.env.example` to `.env.local` and fill in:

- Clerk keys (from [clerk.com](https://clerk.com))
- `DATABASE_URL` (Neon Postgres connection string)

**Run**:

```bash
npm run dev
```

**Database migrations** (if using progress/DB features):

```bash
npm run db:generate
npm run db:migrate
```

## Scripts

| Script                | Purpose                     |
| -------------------- | --------------------------- |
| `npm run dev`        | Start dev server            |
| `npm run build`      | Production build            |
| `npm run start`      | Run production server       |
| `npm run lint`       | Run ESLint                  |
| `npm run db:generate`| Generate Drizzle migrations |
| `npm run db:migrate` | Run migrations              |

## Project Structure

- `src/app/` — Next.js App Router (auth, main layout, module/lesson/quiz/project routes)
- `src/components/` — UI (lesson blocks, quiz cards, project editor, auth)
- `src/data/` — Curriculum (modules, quizzes) in EN/ES
- `src/views/` — Page-level components
- `db/` — Drizzle schema
