export const APP_VERSION = '3.0.0';

export interface ChangelogEntry {
  version: string;
  date: string;
  description?: string;
  changes: {
    type: 'feat' | 'fix' | 'refactor' | 'perf' | 'chore';
    title: string;
  }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '3.0.0',
    date: '2026-02-21',
    description:
      'Major platform update: multi-path learning with a complete React path.',
    changes: [
      { type: 'feat', title: 'Multi-path platform: choose between Java and React learning paths' },
      { type: 'feat', title: 'New React path: 5 modules, 25 lessons with class ↔ hooks comparisons' },
      { type: 'feat', title: 'Path selection landing page' },
      { type: 'feat', title: 'Generic code comparison system (supports any language pair)' },
      { type: 'refactor', title: 'Path-scoped progress with automatic migration' },
      { type: 'refactor', title: 'URL restructure: /path/[pathId]/module/...' },
      { type: 'feat', title: 'Legacy URL redirects for backward compatibility' },
      { type: 'feat', title: 'Rebrand to Learning for Devs' },
    ],
  },
  {
    version: '2.0.1',
    date: '2026-02-21',
    changes: [
      { type: 'feat', title: 'Typewriter effect for chat assistant messages' },
      { type: 'feat', title: 'Chat translations (EN/ES)' },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-02-20',
    description:
      'Modelo: Google Gemini 2.5. API: Google Generative AI. Las respuestas se transmiten por streaming (SSE). El asistente usa un system instruction que lo especializa en Java para devs JS/TS y responde en el idioma del usuario.',
    changes: [
      { type: 'feat', title: 'Widget de chat con asistente Java impulsado por IA' },
      { type: 'feat', title: 'Integración con Gemini 2.5 (configurable vía GEMINI_MODEL)' },
      { type: 'feat', title: 'Respuestas en streaming en tiempo real' },
      { type: 'feat', title: 'Traducciones del chat (EN/ES)' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-02-20',
    changes: [
      { type: 'feat', title: 'Internacionalización completa (EN/ES)' },
      { type: 'feat', title: 'Sistema de progreso con persistencia en Neon' },
      { type: 'feat', title: 'Auth custom con Clerk, tema redesign' },
      { type: 'feat', title: 'Migración a Next.js App Router' },
    ],
  },
];
