# Communication Center

A chat interface built as a frontend technical test. The project demonstrates clean architecture, responsive design, and realistic async state management using Vue 3 and TypeScript.

**Visual reference:** [Figma Design](https://www.figma.com/design/tNP3PqdaRymLStNe82qzS3/Desafio-t%C3%A9cnico---Frontend?node-id=1-6976)

## Stack

| Technology | Purpose |
|---|---|
| **Vue 3** | Composition API with `<script setup>` |
| **TypeScript** | Strict typing — no `any` |
| **Pinia** | Centralized state management |
| **PrimeVue** | UI primitives used selectively (Avatar, Badge, Button, Skeleton, Dialog) |
| **Sass (SCSS)** | Structured styling with BEM naming |
| **Vite** | Build tooling and dev server |
| **Vitest** | Unit testing with Vue Test Utils |
| **ESLint** | Code quality with Vue 3 + TypeScript rules |

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
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
src/
├── assets/
│   └── icons/              # SVG icons
├── components/
│   ├── chat/
│   │   ├── conversation/   # Conversation list, item, skeleton, contact list
│   │   ├── message/        # Message bubble, list, input, skeleton, attachments
│   │   └── ChatHeader.vue  # Shared chat header
│   ├── layout/             # Layout containers (AppSidebar, ChatContainer)
│   └── ui/                 # Reusable base components (BaseEmptyState, SearchInput)
├── composables/            # Reusable composition functions
├── mocks/                  # Fake data with UUID-based entities
├── router/                 # Vue Router config
├── services/               # Fake API layer (swappable for real endpoints)
├── stores/                 # Pinia store (single useChatStore)
├── styles/
│   ├── abstracts/          # Variables, mixins, breakpoints (globally injected)
│   ├── base/               # Reset, global styles, animations
│   └── components/         # Shared BEM component partials
├── types/                  # Domain types (User, Message, Conversation, Attachment)
└── views/                  # Thin page shells
```

## Architecture Decisions

### Separation of Concerns

- **Views** orchestrate layout — kept thin, no business logic
- **Components** are presentational — receive props, emit events
- **Store** owns all state transitions and side effects
- **Services** abstract data access behind a contract
- **Composables** handle reusable UI logic with no store dependency

### Component Design

- Custom-built chat layout — PrimeVue used only where it adds value
- Container components (`AppSidebar`, `ChatContainer`) connect to the store
- Presentational components (`MessageBubble`, `ConversationItem`, etc.) are pure props + events
- BEM naming for all CSS classes with scoped SCSS per component

## State Management

Single `useChatStore` as the centralized source of truth:

- **Conversations** — active, archived, and contacts lists
- **Messages** — cached per conversation to avoid redundant fetches
- **UI state** — loading flags, selected conversation, archive view toggle
- **Typing simulation** — triggered after sending a message (1.5s delay → 3s typing → auto-reply)
- **Message status** — `sent`, `delivered`, `read` tracked per message

All state transitions are controlled exclusively in the store. Components dispatch actions and read getters.

## Fake API Layer

The `chatService` simulates an async backend with 400ms delay on all operations:

- `getConversations()` / `getArchivedConversations()` / `getContacts()`
- `getMessages(conversationId)` — cached in store after first fetch
- `sendMessage(payload)` — supports text and file attachments (base64)
- `simulateReply(conversationId)` — returns a random response from a pool
- `archiveConversation()` / `unarchiveConversation()` / `createConversation()`

The service returns data without mutating shared state — the store is the single source of truth for UI state. Replacing the service with real API calls requires no changes to the store or components.

## Accessibility

- Semantic HTML throughout (`<aside>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<time>`)
- ARIA attributes: `role="log"`, `role="listbox"`, `role="option"`, `role="separator"`, `role="menu"`, `aria-live="polite"`, `aria-selected`, `aria-expanded`, `aria-haspopup`
- Visible `:focus-visible` states on all interactive elements
- Keyboard navigation: Enter to send, Shift+Enter for new line, Escape to close menus
- Screen reader support for dynamic content (typing indicator, message list)

## Testing

50 unit tests across 7 test files using Vitest + Vue Test Utils:

- **Store tests** — fetch, select, send, archive, message caching, clearSelection, attachment-only send, send guards
- **Composable tests** — `useCharacterLimit` (boundary conditions), `useDebounce` (timing)
- **Component tests** — `ConversationItem`, `MessageBubble`, `MessageInput`, `DateDivider`

Run with `npm run test` or `npm run test:watch` for watch mode.

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| **Desktop** (≥1024px) | Sidebar (360px) + chat area side by side |
| **Tablet** (768–1023px) | Narrower sidebar (300px), chat takes remaining space |
| **Mobile** (<768px) | Single-panel view — conversation list or chat with back button |

Mobile navigation is managed at the view level via `useResponsive` composable. Selecting a conversation shows the chat panel; the back button returns to the list.

## Development Process

This project was built incrementally following **GitFlow conventions** with small, focused steps:

1. Project scaffolding and SCSS foundation
2. Domain types, mock data, and fake service layer
3. Pinia store with state, getters, and actions
4. Layout structure (sidebar + chat container)
5. Conversation list with search, avatars, and badges
6. Chat header, message rendering, and composer
7. Typing indicator with simulated auto-reply
8. Archived conversations with archive/unarchive flow
9. New conversation flow with contact list
10. File attachments with image/PDF preview modal
11. Loading skeletons and empty states
12. Responsive layout with mobile panel switching
13. Accessibility improvements
14. Unit tests
15. Code quality pass and ESLint setup

Each step produced a **lean semantic commit** (e.g., `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`) targeting a single concern.

## Future Improvements

- End-to-end tests with Cypress or Playwright
- Message search within conversations
- Read receipts with real-time updates
- Group conversations
- Push notifications
- Dark mode theme
- Internationalization (i18n)
- Real WebSocket integration for live messaging

## Conventions

See [CONVENTIONS.md](./CONVENTIONS.md) for detailed architecture, naming, styling, and Git conventions.
