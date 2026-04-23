# Communication Center

Chat interface built with Vue 3, TypeScript, Pinia, PrimeVue and Sass.

## Stack

- **Vue 3** — Composition API with `<script setup>`
- **TypeScript** — strict typing, no `any`
- **Pinia** — state management
- **PrimeVue** — UI primitives (used selectively)
- **Sass (SCSS)** — structured styling with BEM
- **Vite** — build tooling

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── components/     # Reusable presentational components
├── composables/    # Reusable composition functions
├── mocks/          # Fake data for development
├── router/         # Vue Router config
├── services/       # API/service layer (fake or real)
├── stores/         # Pinia stores
├── styles/         # Global SCSS (abstracts, base, components)
├── types/          # Shared TypeScript types and interfaces
└── views/          # Page-level components
```

See [CONVENTIONS.md](./CONVENTIONS.md) for architecture and coding standards.
