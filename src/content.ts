import type {
  Fact, Job, Link, MoreProject, Project, SkillGroup, Section,
} from './content.types';

export type { Fact, Job, Link, MoreProject, Project, Role, SkillGroup, Section } from './content.types';

export const CAL_URL = 'https://calendar.app.google/jp7854e7MJPsHjSCA';
export const EMAIL = 'mishakolotov1@gmail.com';

const ext = (label: string, href: string): Link => ({ label, href, external: true });

export const site: {
  name: string; title: string; description: string; eyebrow: [string, string]; status: string;
  headline: [string, string]; lead: [string, string]; terms: string; note: string; photoAlt: string;
  footer: string; footerName: string;
} = {
  name: 'Mikhail Kolatau',
  title: 'Mikhail Kolatau · Senior Full-Stack AI Engineer · TypeScript, React, Angular, Node.js',
  description: `Senior frontend and full-stack engineer, Warsaw. Angular since 2016, React and Next.js, Node.js. Lately AI: Lumigo's LLM UI, OpenAI's AI Lab. Remote in Europe.`,
  eyebrow: ['Senior Full-Stack AI Engineer', 'TypeScript, React, Angular, Node.js'],
  status: 'Open to a new role · can start in two weeks',
  headline: ['I build AI products.', 'And I test the models behind them.'],
  lead: [
    'Ten years building web products in TypeScript.',
    `Since 2025, AI work too: Lumigo, OpenAI's AI Lab on contract, and my own LLM job-search bot in production.`,
  ],
  terms: 'Warsaw (CET) · EU work-authorised · remote in Europe · B2B through my own company · English: full professional',
  note: `that's me and my dog`,
  photoAlt: 'Mikhail Kolatau on a balcony at sunset, holding a small black and white dog',
  footer: 'Numbers since 2025 come from git or my own measurements. Older ones are from my CV or an archived repo.',
  footerName: 'Mikhail Kolatau · Warsaw',
};

/** Extra: shared UI labels, verbatim from the mock. */
export const labels = {
  bookShort: 'Book a call',
  book: 'Book a 20-minute call',
  cv: 'Download CV (PDF)',
  workedWith: 'Worked with',
  more: 'More',
  earlier: 'earlier',
  skip: 'Skip to content',
} as const;

/** Extra: nav bar and the hero "jump" row (same four anchors). */
export const nav: Link[] = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

/** Extra: section headings and sub-lines. */
export const sections: {
  experience: Section; projects: Section & { moreHeading: string }; stack: Section;
  howIWork: Section; outside: Section; contact: Section;
} = {
  experience: { heading: 'Experience', sub: '2016 → now' },
  projects: {
    heading: 'Projects',
    sub: 'My own projects. The specs, decisions and measurements are mine. Claude Code, an AI coding agent, writes most of the code.',
    moreHeading: 'More projects',
  },
  stack: { heading: 'Skills and stack', sub: 'Most used first.' },
  howIWork: { heading: 'How I work with AI agents', sub: 'The setup is in my repos. I can show it on a call.' },
  outside: { heading: 'Outside of code', sub: 'Audio engineer' },
  contact: { heading: 'Contact' },
};

export const facts: Fact[] = [
  { label: 'OpenAI AI Lab', text: `Aug → Oct 2026. I wrote software-engineering evaluation tasks for OpenAI's models. Promoted to reviewer a week in.` },
  { label: '5 LLM providers', text: 'in the trace and evaluation UI I owned at Lumigo: OpenAI, Anthropic, Bedrock, Gemini, Vertex' },
  { label: 'My own LLM bot', text: 'in production since June 2026. Its scoring is measured on 80 labelled real postings.' },
  { label: '10 years', text: 'of commercial TypeScript, frontend and full-stack. Angular since 2016, React at ICE, Kaseya and Pynea.' },
];

export const workedWith: Link[] = [
  { label: 'OpenAI AI Lab (via Digis)', href: '#digis' },
  { label: 'Oreamnos', href: '#digis' },
  { label: 'Lumigo', href: '#lumigo' },
  { label: 'Kaseya', href: '#kaseya' },
  { label: 'ICE Mortgage Technology', href: '#ice' },
  { label: 'Pynea', href: '#pynea' },
];

export const contacts: Link[] = [
  { label: EMAIL, href: `mailto:${EMAIL}` },
  ext('Telegram', 'https://t.me/gigamike666'),
  ext('LinkedIn', 'https://linkedin.com/in/mikhail-kolatau'),
  ext('GitHub', 'https://github.com/MishaKolotov'),
];

export const experience: Job[] = [
  {
    id: 'digis',
    heading: 'Contract work through Digis',
    dates: 'Feb 2026 → now · Digis is a contracting agency',
    roles: [
      {
        org: ext('OpenAI AI Lab', 'https://openai.com'),
        title: 'AI Evaluation Expert and Domain Reviewer',
        dates: 'Aug → Oct 2026 · alongside Oreamnos',
        context: 'I wrote hard software research tasks, ran the model on them and graded its answers against a rubric.',
        bullets: [
          'Three tasks delivered. Each came with a **rubric of 60 to 97 items**, every item backed by a source.',
          `**Promoted to reviewer of other experts' tasks a week in.** Five submissions reviewed.`,
        ],
        more: [
          'I ran the model on every task to find where it really failed, and wrote up each failure with the source that disproves it.',
          'Built tooling for the work: five Claude Code skills and a rubric linter that runs on every edit.',
        ],
        moreLabel: 'about the OpenAI AI Lab work',
        chips: ['LLM evals', 'rubric design', 'Claude Code'],
      },
      {
        org: ext('Oreamnos', 'https://oreamnos.de'),
        title: 'Senior Full-Stack Engineer',
        dates: 'Feb 2026 → now',
        context: 'Four Angular products and a Spring Boot service for German compliance teams.',
        bullets: [
          '**Main frontend author of two products**: document management and a whistleblowing platform.',
          'Wrote the Playwright E2E suite, **169 tests in 31 files**.',
        ],
        more: [
          'Put a Tiptap rich-text editor (React 19) inside the Angular app, with support for collaborative editing. Built a reporting library with drag-and-drop dashboards on GridStack and ECharts.',
          'E-invoice validation product, merged to staging. I built the Angular 21 frontend on my own layer of 31 components, plus part of the Spring Boot backend (multi-tenancy, sign-up with email verification, rate limiting).',
          'Second-largest contributor to the shared design system of 80 components, used by three product apps. Led its upgrade from Angular 20 to 21 in a day.',
        ],
        moreLabel: 'about the Oreamnos work',
        chips: ['Angular 21', 'Nx', 'NgRx Signals', 'PrimeNG', 'Tailwind 4', 'Tiptap', 'Playwright', 'Spring Boot', 'Keycloak', 'WCAG AA'],
      },
    ],
  },
  {
    id: 'pynea',
    org: ext('Pynea', 'https://pynea.com'),
    title: 'Senior Software Engineer',
    dates: 'Feb → Apr 2026 · fixed-scope contract, alongside Oreamnos',
    context: 'Enterprise HR software, London-based. Next.js 15 and TypeScript, a monorepo of 17 packages.',
    bullets: [
      'Led the redesign of the Settings area, 8+ screens, from Figma to production.',
      'Built interview scheduling on GraphQL, plus roles and permissions for the multi-tenant product.',
    ],
    more: ['Fixed keyboard focus in the shared dialog system: a focus trap that blocked inputs, and focus handling in nested drawers and dialogs.'],
    moreLabel: 'about Pynea',
    chips: ['Next.js 15', 'React 18', 'GraphQL / Apollo', 'Zustand', 'Radix', 'Storybook', 'Turborepo'],
  },
  {
    id: 'lumigo',
    org: ext('Lumigo', 'https://lumigo.io'),
    title: 'Senior Software Developer',
    dates: 'Feb → Nov 2025 · ended when the company was acquired',
    context: 'Monitoring for cloud and LLM apps. A frontend monorepo of 100+ packages.',
    bullets: [
      '**Main author of the AI / LLM part of the product UI.**',
      'Shipped the LLM evaluation screens and **wrote, on my own, the module that aggregates their scores**.',
      'Built the LLM trace view for **five providers**, with token cost per call and OpenTelemetry spans.',
    ],
    more: [
      'The five providers: OpenAI, Anthropic, Amazon Bedrock, Gemini, Vertex.',
      'Second most active contributor to the frontend over the period.',
      'Main author of Logs Live Tail, real-time log streaming over GraphQL subscriptions. Built the LLM traces table on AG Grid with server-side loading.',
      'Ran releases every two weeks and live customer demos, mentored engineers, led code reviews.',
    ],
    moreLabel: 'about Lumigo',
    chips: ['Angular 19', 'Nx', 'RxJS', 'AG Grid', 'Cytoscape.js', 'Highcharts', 'Cypress', 'feature flags'],
  },
  {
    id: 'kaseya',
    org: ext('Kaseya', 'https://www.kaseya.com'),
    orgAlso: ext('Pulseway', 'https://www.pulseway.com'),
    title: 'Software Development Engineer',
    dates: 'Aug 2021 → Feb 2025',
    context: 'Remote monitoring software for IT teams. Led the team and ran hiring interviews.',
    bullets: [
      'Moved the app from **Angular 12 to 18**: build time 272 s → 99 s, known vulnerabilities 65 → 3.',
      'Built the Security page (two-factor enforcement, IP allow-list) and the shared search and filter bar.',
    ],
    more: [
      'Moved 30% of components from legacy LESS to Tailwind and added React modules to the Angular app through Module Federation.',
      `White-label build on a feature branch: the brand name became a setting across the app's views and code, 2,170 unused files removed.`,
    ],
    moreLabel: 'about Kaseya',
    chips: ['Angular', 'AngularJS', 'NGXS', 'NgRx', 'Module Federation', 'React widgets', 'Tailwind'],
  },
  {
    id: 'ice',
    org: ext('ICE Mortgage Technology', 'https://www.icemortgagetechnology.com'),
    title: 'Senior Software Development Engineer',
    dates: 'Mar 2020 → Aug 2021',
    context: 'A large US mortgage platform, part of Intercontinental Exchange. Angular with React modules inside.',
    bullets: [
      'Designed the layer that lets the Angular and React parts of the product talk to each other.',
      'Cut page load time from about 4.5 s to 2.7 s.',
    ],
    chips: ['Angular', 'React', 'Redux', 'micro-frontends', 'Jest', 'GitLab CI'],
  },
];

export const earlier: { summary: string; context: string; chips: string[] } = {
  summary: 'Earlier: Strateg Group, Full-Stack Developer (Angular 2+, PHP), 2016–2020',
  context: 'A start-up in Minsk. I chose Angular 2+ as the main framework, built the backend on Symfony and Laravel, and took features from requirements to release.',
  chips: ['Angular 2+', 'Symfony', 'Laravel'],
};

export const projects: Project[] = [
  {
    name: ext('GigaWork', 'https://github.com/MishaKolotov/llm-job-triage'),
    status: 'in production since June 2026',
    summary: 'A Telegram bot that finds jobs for me. It pulls postings from 18 sources, drops the wrong ones with simple rules before any model call, and has a model score the rest.',
    stats: [
      { label: '37,702', text: 'postings collected by October 2026' },
      { label: '47 of 60', text: 'good postings (ones I applied to or the bot sent me) pass the scorer I shipped. The old one, re-run, passes 35.' },
    ],
    story: {
      lead: 'One thing I caught by measuring.',
      text: 'The bot was paying a model to score postings that had nothing to do with my work, nurses and lawyers among them: 1,365 of 4,845 paid scores in three weeks came out near zero. I added a free check on the job title that runs before any paid call.',
    },
    more: [
      'I test scoring on 80 real postings labelled by outcome. After a model change I re-ran them: scores fell about 8 points and the live threshold of 60 still held.',
      'Posting text reaches the model wrapped as data, as a defence against prompt injection. The agents that read it get only allow-listed tools.',
      'The job queue is plain Postgres. Workers take rows with an atomic claim, with no separate queue service.',
      'It also built CVs and cover letters on demand from a structured record of my whole career, with the facts pinned so nothing got invented.',
      'If one model provider fails, the next one takes over. A failed provider is parked for its retry window (a circuit breaker).',
      '11 LLM-judge agents check each generated CV, and two can block it. The judges are not yet checked against human labels.',
      'An e-mail application goes out only after I press Send, and never twice.',
      'I measured the Batch API at 2.3 times the price of cached calls ($0.0047 against $0.0020 per posting), so I dropped it before launch.',
    ],
    moreLabel: 'about GigaWork',
    chips: ['TypeScript', 'Next.js', 'Node.js', 'Postgres (Neon)', 'SQL', 'Drizzle', 'Claude', 'Gemini', 'Zod', 'Vitest'],
    links: [ext('Scoring code on GitHub', 'https://github.com/MishaKolotov/llm-job-triage')],
  },
  {
    name: ext('GigaMixer', 'https://automix-delta.vercel.app'),
    status: 'live',
    summary: 'Mixing a multitrack recording in the browser. You type what is wrong ("the vocal is buried") and a model turns it into a checked list of changes.',
    bullets: [
      'A cheap model answers first. If the answer fails validation or the call fails, it retries once on a stronger model.',
      'Guardrails live in code, not in the prompt: the server clamps every change the model proposes to an allowed range.',
    ],
    more: [
      'A test set of 150 labelled phrases with pass thresholds, including attempts to trick the model.',
      'A Python worker separates instruments from a recording with local models.',
    ],
    moreLabel: 'about GigaMixer',
    chips: ['Next.js', 'Anthropic SDK', 'tool calling', 'shadcn/ui', 'Demucs', 'Supabase', 'Cloudflare R2'],
    links: [ext('Open the app', 'https://automix-delta.vercel.app')],
  },
  {
    name: ext('big-s-studio', 'https://gigamike666.com'),
    status: 'live',
    summary: 'The site of my recording studio. Artists leave comments right on the audio waveform, and I update the site from a Telegram bot. It has its own design system.',
    bullets: [
      '63 design tokens (colours, fonts, spacing) from one JSON source, generated as code for web, iOS, Android and Windows.',
      'The build fails if text contrast drops below WCAG AA, the accessibility standard.',
    ],
    chips: ['Next.js 16', 'React 19', 'Server Components', 'Web Audio API', 'design tokens', 'Drizzle'],
    links: [ext('Open the site', 'https://gigamike666.com')],
  },
  {
    name: ext('bandcamp-daily', 'https://github.com/MishaKolotov/bandcamp-daily'),
    status: 'runs daily',
    summary: 'Picks one new release a day from my Bandcamp collection. A small audio model compares how releases sound, and that raised ranking quality (MRR) from 0.118 to 0.200. I tuned and tested on the same data, so the number is optimistic.',
    chips: ['TypeScript', 'Node.js 20', 'ONNX', 'embeddings', 'GitHub Actions'],
  },
];

export const moreProjects: MoreProject[] = [
  { name: ext('Bandcogs', 'https://bandcogs.vercel.app'), text: 'An app for bands. Next.js, NestJS, React Native with Expo, Supabase.', status: 'in progress' },
  { name: ext('agent-harness', 'https://github.com/MishaKolotov/agent-harness'), text: 'Safety rules for coding agents. Every rule has a test that proves it blocks what it should.', status: 'public repo' },
  { name: ext('ctaio-jobfit', 'https://ctaio-jobfit.vercel.app'), text: 'Matches a CV to 406 open postings with one model call.', status: 'live demo' },
  { name: ext('under-big-black-sun', 'https://under-the-big-black-sun.vercel.app'), text: 'A photo zine in English and Polish. Payload CMS, Next.js 15, Postgres.', status: 'live' },
  { name: ext('SpeakNow', 'https://github.com/MishaKolotov/bandwidth-check'), text: 'Video recording in the browser that adapts quality to connection speed. Angular 21.', status: 'public repo' },
  { name: ext('Manyas E2E', 'https://github.com/MishaKolotov/manyas-e2e'), text: 'Playwright tests for a survey in 10 languages on three devices. Client work.', status: 'public repo' },
  { name: ext('MixFeedback', 'https://github.com/MishaKolotov/mixfeedback'), text: 'Real-time comments on a track. NestJS, Angular 19. A study project.', status: 'public repo' },
  { name: 'quiz', text: 'My study tool. A model grades spoken answers about code against a rubric.', status: 'private repo' },
  { name: 'tg-summary-bot', text: 'Summarises long Telegram chats with Gemini. Python.', status: 'runs locally' },
];

export const stack: SkillGroup[] = [
  {
    name: 'AI / LLM',
    core: ['structured outputs', 'tool calling', 'LLM evals', 'Claude API', 'prompt caching', 'LLM observability'],
    more: ['LLM-as-judge', 'model routing and fallback', 'cheap model first, stronger one on failure', 'cost and latency tracking', 'prompt-injection defences', 'agents with least privilege', 'browser agents', 'human approval before irreversible steps', 'embeddings, cosine similarity', 'Whisper speech-to-text', 'Gemini'],
    moreLabel: 'AI and LLM skills',
  },
  {
    name: 'Frontend',
    core: ['TypeScript', 'JavaScript', 'Angular 2 → 21', 'React 18–19', 'Next.js 15–16', 'SSR, App Router', 'RxJS', 'Tailwind'],
    more: ['HTML, CSS', 'Angular Signals', 'Server Components', 'React Native, Expo', 'AngularJS', 'SCSS', 'LESS', 'styled-components', 'CSS Modules', 'Web Components'],
    moreLabel: 'frontend skills',
  },
  {
    name: 'State and data',
    core: ['NgRx Signals', 'TanStack Query', 'GraphQL', 'REST', 'Zod'],
    more: ['NGXS', 'NgRx', 'Elf', 'Zustand', 'Redux', 'Apollo', 'React Hook Form', 'OpenAPI', 'WebSocket', 'AWS Amplify subscriptions'],
    moreLabel: 'state and data skills',
  },
  {
    name: 'UI and design systems',
    core: ['design tokens', 'accessibility, WCAG AA', 'Figma to code', 'Storybook', 'PrimeNG'],
    more: ['Angular Material', 'Radix', 'Mantine', 'shadcn/ui', 'Style Dictionary', 'Atomic Design', 'Tiptap', 'AG Grid', 'Cytoscape.js', 'ECharts', 'Highcharts', 'Recharts', 'visx', 'GridStack', 'i18n, Transloco'],
    moreLabel: 'UI skills',
  },
  {
    name: 'Backend',
    core: ['Node.js', 'PostgreSQL, SQL', 'Drizzle', 'Telegram bots', 'queues in Postgres'],
    more: ['NestJS', 'Express', 'Payload CMS', 'Supabase', 'Neon', 'Upstash Redis', 'Spring Boot', 'Symfony', 'Laravel'],
    moreLabel: 'backend skills',
    note: 'Node and Postgres in production: only in my own products. At employers my backend work was Spring Boot and PHP.',
  },
  {
    name: 'Architecture',
    core: ['Nx monorepo', 'Module Federation', 'micro-frontends', 'Turborepo', 'multi-tenancy', 'roles and permissions', 'feature flags', 'large version migrations'],
  },
  {
    name: 'Testing',
    core: ['Vitest', 'Playwright', 'Cypress', 'Jest', 'Jasmine', 'React Testing Library', 'MSW', 'unit, integration, E2E', 'visual regression'],
  },
  {
    name: 'Tooling',
    core: ['Claude Code', 'Git', 'Vercel', 'CI/CD: GitHub Actions, GitLab CI, CircleCI', 'Docker', 'Vite', 'Webpack', 'Sentry', 'PostHog', 'Keycloak, OIDC'],
  },
];

export const howIWork: { sub: string; intro: string; rulesLabel: string; rules: { title: string; text: string }[] } = {
  sub: 'The setup is in my repos. I can show it on a call.',
  intro: 'ChatGPT in my daily work since 2022, Cursor at Lumigo, Claude Code now. I write the spec and a failing test first. One agent writes the code, a second one reviews it and cannot change files.',
  rulesLabel: 'The four rules',
  rules: [
    { title: 'Spec before any behaviour change', text: 'the edit is blocked while the spec has open questions' },
    { title: 'Separate agents write, review and verify', text: 'diagnosis runs on a stronger model' },
    { title: 'Automatic guards', text: 'no secrets in commits, lint must pass, the turn cannot end while tests are red' },
    { title: 'Every guard is tested', text: 'with one case it must allow and one it must block' },
  ],
};

/** `text` contains the placeholder {studio} where the studio link is rendered. */
export const outside: { sub: string; text: string; studio: Link; line: string } = {
  sub: 'Audio engineer',
  text: `I record, mix and master bands from Warsaw's DIY hardcore-punk scene at {studio}. I also write my own audio analysis tools in Python.`,
  studio: ext('big-s-studio', 'https://gigamike666.com'),
  line: 'Trained as a quantum electronics engineer: BSc, BSUIR (Minsk), 2018 · English: full professional · Russian: native · Polish: A2',
};

export const contact: { heading: string; text: string; links: Link[]; cv: Link } = {
  heading: 'Hiring an AI, full‑stack or frontend engineer? Book a call or write to me.',
  text: 'I can start two weeks after an offer.',
  links: [
    ext('Telegram @gigamike666', 'https://t.me/gigamike666'),
    ext('linkedin.com/in/mikhail-kolatau', 'https://linkedin.com/in/mikhail-kolatau'),
    ext('github.com/MishaKolotov', 'https://github.com/MishaKolotov'),
    { label: 'Download CV (PDF)', href: '/Mikhail_Kolatau_CV.pdf' },
  ],
  cv: { label: 'Download CV (PDF)', href: '/Mikhail_Kolatau_CV.pdf' },
};
