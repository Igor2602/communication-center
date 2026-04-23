# Chat Interface — Frontend Technical Test Design

## Overview

A portfolio-grade chat interface built with Vue 3, TypeScript, Pinia, PrimeVue, and Sass. The project demonstrates frontend craftsmanship through clean architecture, polished UI, responsive design, and realistic async state management.

**Visual reference:** [Figma Design](https://www.figma.com/design/tNP3PqdaRymLStNe82qzS3/Desafio-t%C3%A9cnico---Frontend?node-id=1-6976)

## Goals

- Demonstrate clean, scalable frontend architecture
- Show proficiency with Vue 3 Composition API, TypeScript, and Pinia
- Build a fully responsive chat interface (desktop, tablet, mobile)
- Simulate realistic async data flow with fake services
- Achieve polished, accessible UI with subtle animations

## Domain Types

```typescript
type UserId = string
type MessageStatus = 'sent' | 'delivered' | 'read'

interface Contact {
  id: UserId
  name: string
  avatarUrl?: string
}

interface Message {
  id: string
  conversationId: string
  senderId: UserId
  content: string
  timestamp: string // ISO 8601, consistent across all entities
  status: MessageStatus
}

interface Conversation {
  id: string
  contact: Contact
  lastMessage: Message | null
  unreadCount: number
  isArchived: boolean
  isTyping: boolean
}

const CURRENT_USER_ID: UserId = 'me'
```

**Key decisions:**
- `avatarUrl` is optional — not all contacts may have an image
- `UserId` and `MessageStatus` are extracted as reusable types
- `timestamp` is the consistent field name across all entities (not `createdAt`)
- Current user is identified by `CURRENT_USER_ID = 'me'` — no auth needed

## Fake Service Layer

Two services with simulated async (200-800ms random delay via Promises):

### ConversationService

- `getConversations()` — returns all non-archived conversations
- `archiveConversation(id)` — marks a conversation as archived
- `searchConversations(query)` — filters by contact name or last message content

### MessageService

- `getMessages(conversationId)` — returns messages for a conversation
- `sendMessage(conversationId, content)` — adds a message, returns it with `sent` status
- `simulateReply(conversationId)` — returns `{ delay: number, reply: Message }` — the store controls typing state transitions and appends the reply

**Rules:**
- Services are focused on data access and async simulation
- Services hold mock data in memory (simple arrays)
- Only the store calls services — components never call services directly
- The store orchestrates UI state transitions (typing indicators, loading states)

## Pinia Store

Single `useChatStore` as the centralized source of truth.

### State

```typescript
{
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Record<string, Message[]>  // keyed by conversationId
  searchQuery: string
  isLoadingConversations: boolean
  isLoadingMessages: boolean
}
```

### Getters

- `activeConversation` — the currently selected conversation
- `activeMessages` — messages for the active conversation
- `visibleConversations` — non-archived conversations filtered by search query and sorted by last message timestamp (newest first). Single getter combining filter + sort to avoid redundant derivation.

### Actions

- `fetchConversations()` — calls service, manages loading state
- `selectConversation(id)` — sets active, fetches messages only if not cached, resets unread count
- `sendMessage(content)` — calls service, appends message, updates lastMessage, orchestrates reply simulation (toggle isTyping on → wait delay → append reply → toggle isTyping off → update lastMessage)
- `archiveConversation(id)` — calls service, removes from list, clears active if it was the archived one
- `setSearchQuery(query)` — updates search query, filtering happens reactively via getter

**Key decisions:**
- Messages are cached per conversation — `selectConversation` only fetches if not already loaded
- The store owns all state transitions — components only read getters and dispatch actions
- Reply simulation orchestration lives in the store, not in the service

## Component Tree

```
App.vue
└── ChatLayout                          (responsive shell: sidebar + main)
    ├── ConversationSidebar             (container: orchestrates sidebar)
    │   ├── SidebarHeader               (title)
    │   ├── SearchInput                 (search field, emits query)
    │   └── ConversationList            (scrollable list)
    │       └── ConversationItem *      (avatar, name, preview, time, badge, typing)
    │
    └── ChatMain                        (container: orchestrates chat area)
        ├── ChatHeader                  (avatar, name, archive button, back button on mobile)
        ├── MessageList                 (scrollable messages area)
        │   ├── DateDivider *           (date separator)
        │   ├── MessageBubble *         (incoming/outgoing bubble)
        │   └── TypingIndicator         (animated dots)
        └── MessageComposer            (textarea, send button, char counter, shift+enter hint)
```

### Container vs Presentational

**Container/layout components** (connect to store):
- `ChatLayout` — responsive shell, controls mobile panel switching
- `ConversationSidebar` — reads store, dispatches search/select actions
- `ChatMain` — reads store, dispatches send/archive actions

**Presentational components** (props + events only):
- All others — receive props, emit events, no direct store access

### Responsive Behavior

- **Desktop (>=1024px):** sidebar and chat side by side
- **Tablet (768-1023px):** sidebar narrower, chat takes more space
- **Mobile (<768px):** single panel view. Default shows conversation list. Selecting a conversation shows chat with a back button in ChatHeader. Back returns to list.

### Empty State

When no conversation is selected on desktop, ChatMain shows a placeholder message.

## Composables

All composables are in `src/composables/`. They handle pure UI logic with no store access.

### useResponsive()

- Exposes `isMobile`, `isTablet`, `isDesktop` as reactive refs
- Listens to `window.matchMedia` with defined breakpoints
- Used by ChatLayout to control panel visibility

### useAutoScroll(containerRef)

- Watches for new messages and auto-scrolls to bottom
- Respects user scroll position — only auto-scrolls if user is near the bottom

### useCharacterLimit(maxLength)

- Exposes `text`, `remaining`, `isOverLimit`, `percentage`
- Used by MessageComposer for the character counter

### useDebounce(value, delay)

- Returns a debounced reactive ref
- Used by SearchInput to avoid filtering on every keystroke (300ms delay)

## Styling Architecture

### File Structure

```
src/assets/styles/
  _variables.scss      — design tokens
  _mixins.scss         — responsive breakpoints, text truncation
  _reset.scss          — minimal CSS reset
  _base.scss           — body, html, global typography
  _animations.scss     — keyframes for typing dots, fade transitions
  main.scss            — imports all partials
```

### Design Tokens

- **Colors:** primary, background, surface, text-primary, text-secondary, border, unread-badge, incoming-bubble, outgoing-bubble
- **Spacing:** 4px increments (4, 8, 12, 16, 24, 32)
- **Typography:** font-family, sizes (sm, md, lg), weights
- **Breakpoints:** `$bp-mobile: 768px`, `$bp-tablet: 1024px`

### Breakpoint Mixins

```scss
@mixin mobile { @media (max-width: #{$bp-mobile - 1}) { @content; } }
@mixin tablet { @media (min-width: $bp-mobile) and (max-width: #{$bp-tablet - 1}) { @content; } }
@mixin desktop { @media (min-width: $bp-tablet) { @content; } }
```

### BEM Convention

```scss
.conversation-item {
  &__avatar { }
  &__content { }
  &__name { }
  &__preview { }
  &__meta { }
  &__time { }
  &__badge { }
  &--active { }
  &--typing { }
}
```

### Component Styles

- Each `.vue` file uses `<style lang="scss" scoped>`
- Import only `_variables` and `_mixins` as needed
- Global styles come from `main.scss`

### Animations

Subtle only:
- Typing dots bounce
- Message fade-in
- Sidebar transition on mobile

## Testing Strategy

Vitest + Vue Test Utils. ~15-20 tests targeting critical flows.

### Store Tests (highest priority)

- `fetchConversations` — sets loading states, populates data
- `selectConversation` — sets active, fetches messages, resets unread, caches
- `sendMessage` — appends message, updates lastMessage
- `archiveConversation` — removes from list, clears active if needed
- `visibleConversations` — filters and sorts correctly
- `setSearchQuery` — filters conversations by name/content

### Composable Tests

- `useCharacterLimit` — remaining count, isOverLimit boundary
- `useDebounce` — delays value updates correctly

### Component Tests (shallow)

- `ConversationItem` — renders name, preview, time, badge, typing state
- `MessageBubble` — renders content, applies incoming/outgoing class
- `DateDivider` — renders formatted date

### What We Skip

- E2E tests (out of scope)
- Layout/container component tests (thin wrappers)
- Service layer tests (simple mock data, low risk)

## Project Structure

```
src/
  types/                — domain models (Contact, Message, Conversation)
  services/             — fake API layer (ConversationService, MessageService)
  stores/               — Pinia store (useChatStore)
  composables/          — reusable UI logic
  components/
    sidebar/            — ConversationSidebar, SidebarHeader, SearchInput, ConversationList, ConversationItem
    chat/               — ChatMain, ChatHeader, MessageList, MessageBubble, DateDivider, TypingIndicator, MessageComposer
    shared/             — reusable UI primitives (avatar, badge, etc.)
  views/                — thin page shells
  layouts/              — ChatLayout
  assets/
    styles/             — SCSS partials and main.scss
```

## Engineering Standards

- All code, names, commits, and branches in English
- BEM naming for CSS classes
- Strict TypeScript — no `any`
- Semantic, lean commit messages
- GitFlow branch naming (e.g., `feature/project-setup`)
- PrimeVue used selectively where it adds value
- Accessibility best practices (ARIA labels, keyboard navigation, semantic HTML)
- Small incremental steps — never implement the whole project at once

## Interactive Features

- **Search:** filters conversations in real time (debounced 300ms) by contact name or last message content
- **Archive:** archive button in chat header removes conversation from list. If the archived conversation was active, the view returns to the empty state (desktop) or conversation list (mobile).
- **Typing simulation:** after sending a message, the contact "starts typing" for a few seconds, then a fake reply appears
- **Unread badges:** shown on conversations with unread messages, cleared when conversation is selected
