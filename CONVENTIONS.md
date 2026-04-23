# Project Conventions

## Language

All code, file names, variable names, component names, type names, comments, commit messages and branch names must be written in **English**.

## Architecture

### Separation of Concerns

| Layer | Responsibility |
|---|---|
| **Views** | Page-level orchestration. Kept thin — delegate logic to stores and composables. |
| **Components** | Presentational, single-responsibility UI pieces. Receive data via props, emit events up. |
| **Stores (Pinia)** | Centralized state management. All state transitions live here. |
| **Services** | Data access layer. Abstract API calls behind a contract so fakes can be swapped for real endpoints. |
| **Composables** | Reusable UI logic (e.g. keyboard shortcuts, scroll behavior). Shared across components. |
| **Types** | Shared TypeScript interfaces and type definitions. Domain models live here. |
| **Mocks** | Fake data used by the service layer during development. |

### Key Rules

- Business logic stays **outside** UI components.
- Components should be **reusable, cohesive and loosely coupled**.
- Use **layout/container components** where appropriate to separate structure from content.
- Avoid duplicated logic across components — extract to composables or stores.
- Use **strict typing**. Avoid `any`.

## Naming Conventions

### Files and Code

- **Components**: PascalCase (`MessageBubble.vue`)
- **Composables**: camelCase prefixed with `use` (`useScrollToBottom.ts`)
- **Stores**: camelCase prefixed with `use` and suffixed with `Store` (`useChatStore.ts`)
- **Services**: camelCase suffixed with `Service` (`chatService.ts`)
- **Types/Interfaces**: PascalCase (`ChatMessage`, `Conversation`)
- **Constants**: UPPER_SNAKE_CASE
- **Variables and functions**: camelCase

### CSS (BEM)

Follow the **Block Element Modifier** convention:

```scss
.message-bubble {           // Block
  &__content {              // Element
    // ...
  }
  &--outgoing {             // Modifier
    // ...
  }
}
```

- One block per component.
- Use SCSS nesting for elements and modifiers.
- Keep component styles scoped with `<style scoped lang="scss">`.
- Design tokens (colors, spacing, typography) live in `styles/abstracts/_variables.scss`.
- Reusable patterns live in `styles/abstracts/_mixins.scss`.
- Avoid inline styles unless absolutely necessary.

## Git Workflow

### Branching (GitFlow)

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `develop` | Integration branch |
| `feature/<name>` | New feature work |
| `fix/<name>` | Bug fixes |

### Commits

- **Semantic and lean**: describe *what* changed in a single concise line.
- Prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`
- Examples:
  - `feat: add conversation list component`
  - `fix: correct unread badge count`
  - `docs: add project conventions`

## Styling

### SCSS Structure

```
styles/
├── abstracts/    # Variables, mixins, breakpoints (no output)
├── base/         # Reset, global styles
└── components/   # BEM partials for shared component styles
```

- Abstracts are globally injected via `vite.config.ts` — available in all components without import.
- Component-specific styles stay in the component's `<style scoped lang="scss">` block.
- Shared component patterns go in `styles/components/`.

## Comments

Add brief comments **only when the logic is not self-evident**. Avoid noisy or redundant comments.
