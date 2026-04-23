# Chat Interface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a portfolio-grade, fully responsive chat interface demonstrating Vue 3 + TypeScript + Pinia craftsmanship with simulated async data flow.

**Architecture:** Layered architecture with domain types, fake service layer, single Pinia store, composables for UI logic, and container/presentational component split. Services simulate async with random delays. Store owns all state transitions.

**Tech Stack:** Vue 3 (Composition API), TypeScript, Pinia, PrimeVue (selective), Sass/SCSS (BEM), Vitest, Vue Test Utils, Vite

**Spec:** `docs/superpowers/specs/2026-04-23-chat-interface-design.md`

---

## File Map

```
src/
  types/
    chat.ts                         — UserId, MessageStatus, Contact, Message, Conversation, CURRENT_USER_ID
  services/
    delay.ts                        — simulateDelay helper
    mockData.ts                     — seed data for conversations and messages
    conversationService.ts          — getConversations, archiveConversation
    messageService.ts               — getMessages, sendMessage, simulateReply
  stores/
    chatStore.ts                    — useChatStore (state, getters, actions)
  composables/
    useResponsive.ts                — isMobile, isTablet, isDesktop reactive refs
    useAutoScroll.ts                — auto-scroll on new messages
    useCharacterLimit.ts            — text, remaining, isOverLimit, percentage
    useDebounce.ts                  — debounced reactive ref
  components/
    sidebar/
      SidebarHeader.vue             — title
      SearchInput.vue               — search field, emits update:query
      ConversationItem.vue          — avatar, name, preview, time, badge, typing
      ConversationList.vue          — scrollable list of ConversationItem
      ConversationSidebar.vue       — container: connects store to sidebar components
    chat/
      ChatHeader.vue                — avatar, name, archive button, back button (mobile)
      DateDivider.vue               — date separator
      MessageBubble.vue             — incoming/outgoing message bubble
      TypingIndicator.vue           — animated three-dot indicator
      MessageList.vue               — scrollable messages with date dividers + typing indicator
      MessageComposer.vue           — textarea, send button, char counter, shift+enter hint
      ChatMain.vue                  — container: connects store to chat components
    shared/
      UserAvatar.vue                — avatar with fallback initials
  layouts/
    ChatLayout.vue                  — responsive shell, mobile panel switching
  views/
    ChatView.vue                    — thin page shell
  assets/styles/
    _variables.scss                 — design tokens
    _mixins.scss                    — breakpoint mixins, text-truncate
    _reset.scss                     — minimal CSS reset
    _base.scss                      — global typography, body
    _animations.scss                — typing dots, fade-in, slide transitions
    main.scss                       — imports all partials
  App.vue                           — root, mounts ChatView
  main.ts                           — app entry, registers Pinia + PrimeVue

tests/
  stores/
    chatStore.spec.ts               — store action/getter tests
  composables/
    useCharacterLimit.spec.ts       — character limit tests
    useDebounce.spec.ts             — debounce tests
  components/
    ConversationItem.spec.ts        — conversation item rendering
    MessageBubble.spec.ts           — message bubble rendering
    DateDivider.spec.ts             — date divider rendering
    MessageComposer.spec.ts         — keyboard behavior tests
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.ts`, `src/App.vue`, `src/vite-env.d.ts`, `.gitignore`

- [ ] **Step 1: Scaffold Vue 3 + TypeScript project with Vite**

Run:
```bash
npm create vite@latest . -- --template vue-ts
```

Select: Vue, TypeScript

- [ ] **Step 2: Install core dependencies**

Run:
```bash
npm install pinia primevue @primevue/themes sass
```

- [ ] **Step 3: Install dev dependencies for testing**

Run:
```bash
npm install -D vitest @vue/test-utils jsdom @vue/tsconfig
```

- [ ] **Step 4: Configure Vitest in vite.config.ts**

Replace `vite.config.ts` with:

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
```

- [ ] **Step 5: Update tsconfig.app.json for path alias**

Replace `tsconfig.app.json` with:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

- [ ] **Step 6: Configure main.ts with Pinia and PrimeVue**

Replace `src/main.ts` with:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
```

- [ ] **Step 7: Create minimal App.vue**

Replace `src/App.vue` with:

```vue
<template>
  <div id="app">
    <ChatView />
  </div>
</template>

<script setup lang="ts">
import ChatView from '@/views/ChatView.vue'
</script>
```

- [ ] **Step 8: Create placeholder ChatView.vue**

Create `src/views/ChatView.vue`:

```vue
<template>
  <main class="chat-view">
    <p>Communication Center</p>
  </main>
</template>

<script setup lang="ts">
</script>
```

- [ ] **Step 9: Clean up Vite scaffolding**

Delete all default Vite files that are not needed:
- `src/components/HelloWorld.vue`
- `src/style.css`
- Any other default component or asset files from the Vite template

- [ ] **Step 10: Verify dev server starts**

Run: `npm run dev`
Expected: App loads in browser showing "Communication Center"

- [ ] **Step 11: Verify tests run**

Run: `npx vitest run`
Expected: Test runner starts with 0 tests (no test files yet), exits cleanly

- [ ] **Step 12: Update .gitignore**

Ensure `.gitignore` includes:
```
node_modules
dist
.vite
*.local
```

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vue 3 + TypeScript project with Pinia, PrimeVue, Sass, and Vitest"
```

---

### Task 2: SCSS Foundation

**Files:**
- Create: `src/assets/styles/_variables.scss`, `src/assets/styles/_mixins.scss`, `src/assets/styles/_reset.scss`, `src/assets/styles/_base.scss`, `src/assets/styles/_animations.scss`, `src/assets/styles/main.scss`

- [ ] **Step 1: Create _variables.scss**

Create `src/assets/styles/_variables.scss`:

```scss
// Colors
$color-primary: #6b5ce7;
$color-background: #f5f5fa;
$color-surface: #ffffff;
$color-text-primary: #1a1a2e;
$color-text-secondary: #6c6c80;
$color-border: #e8e8ef;
$color-unread-badge: #6b5ce7;
$color-incoming-bubble: #f0f0f5;
$color-outgoing-bubble: #6b5ce7;
$color-outgoing-text: #ffffff;
$color-typing-dot: #6c6c80;
$color-danger: #e74c3c;

// Spacing scale (4px increments)
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-base: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Typography
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-size-xs: 0.6875rem; // 11px
$font-size-sm: 0.75rem;   // 12px
$font-size-md: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.125rem;  // 18px
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Border radius
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 16px;
$radius-full: 50%;

// Shadows
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);

// Breakpoints
$bp-mobile: 768px;
$bp-tablet: 1024px;

// Sidebar
$sidebar-width: 380px;
$sidebar-width-tablet: 300px;

// Transitions
$transition-fast: 150ms ease;
$transition-base: 250ms ease;
```

- [ ] **Step 2: Create _mixins.scss**

Create `src/assets/styles/_mixins.scss`:

```scss
@use 'variables' as *;

@mixin mobile {
  @media (max-width: #{$bp-mobile - 1}) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: $bp-mobile) and (max-width: #{$bp-tablet - 1}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: $bp-tablet) {
    @content;
  }
}

@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin scrollable {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-border;
    border-radius: $radius-sm;
  }
}
```

- [ ] **Step 3: Create _reset.scss**

Create `src/assets/styles/_reset.scss`:

```scss
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

input,
textarea {
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}
```

- [ ] **Step 4: Create _base.scss**

Create `src/assets/styles/_base.scss`:

```scss
@use 'variables' as *;

html {
  font-size: 16px;
}

body {
  font-family: $font-family;
  font-size: $font-size-md;
  font-weight: $font-weight-regular;
  color: $color-text-primary;
  background-color: $color-background;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
}
```

- [ ] **Step 5: Create _animations.scss**

Create `src/assets/styles/_animations.scss`:

```scss
@keyframes typing-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

- [ ] **Step 6: Create main.scss**

Create `src/assets/styles/main.scss`:

```scss
@use 'reset';
@use 'base';
@use 'animations';
```

- [ ] **Step 7: Verify styles compile**

Run: `npm run dev`
Expected: App loads with Inter font, correct background color, no SCSS compilation errors

- [ ] **Step 8: Commit**

```bash
git add src/assets/styles/
git commit -m "style: add SCSS foundation with design tokens, mixins, reset, and animations"
```

---

### Task 3: Domain Types

**Files:**
- Create: `src/types/chat.ts`

- [ ] **Step 1: Create domain types**

Create `src/types/chat.ts`:

```typescript
export type UserId = string

export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface Contact {
  id: UserId
  name: string
  avatarUrl?: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: UserId
  content: string
  timestamp: string
  status: MessageStatus
}

export interface Conversation {
  id: string
  contact: Contact
  lastMessage: Message | null
  unreadCount: number
  isArchived: boolean
  isTyping: boolean
}

export const CURRENT_USER_ID: UserId = 'me'
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx vue-tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/types/chat.ts
git commit -m "feat: add domain types for Contact, Message, and Conversation"
```

---

### Task 4: Mock Data and Service Helpers

**Files:**
- Create: `src/services/delay.ts`, `src/services/mockData.ts`

- [ ] **Step 1: Create delay helper**

Create `src/services/delay.ts`:

```typescript
export function simulateDelay(min = 200, max = 800): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

- [ ] **Step 2: Create mock data**

Create `src/services/mockData.ts`:

```typescript
import type { Contact, Conversation, Message } from '@/types/chat'

const contacts: Contact[] = [
  { id: 'contact-1', name: 'Ana Silva', avatarUrl: undefined },
  { id: 'contact-2', name: 'Carlos Mendes' },
  { id: 'contact-3', name: 'Julia Costa', avatarUrl: undefined },
  { id: 'contact-4', name: 'Pedro Oliveira' },
  { id: 'contact-5', name: 'Mariana Santos' }
]

export const mockMessages: Message[] = [
  // Conversation 1 — Ana Silva
  {
    id: 'msg-1-1',
    conversationId: 'conv-1',
    senderId: 'contact-1',
    content: 'Hey! How is the project going?',
    timestamp: '2026-04-23T09:00:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-1-2',
    conversationId: 'conv-1',
    senderId: 'me',
    content: 'Going well! Almost done with the frontend.',
    timestamp: '2026-04-23T09:05:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-1-3',
    conversationId: 'conv-1',
    senderId: 'contact-1',
    content: 'Nice! Let me know if you need any help with the design review.',
    timestamp: '2026-04-23T09:10:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-1-4',
    conversationId: 'conv-1',
    senderId: 'me',
    content: 'Will do, thanks!',
    timestamp: '2026-04-23T09:12:00.000Z',
    status: 'delivered'
  },

  // Conversation 2 — Carlos Mendes
  {
    id: 'msg-2-1',
    conversationId: 'conv-2',
    senderId: 'me',
    content: 'Did you check the pull request I sent yesterday?',
    timestamp: '2026-04-22T14:30:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-2-2',
    conversationId: 'conv-2',
    senderId: 'contact-2',
    content: 'Not yet, I will look at it this afternoon.',
    timestamp: '2026-04-22T15:00:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-2-3',
    conversationId: 'conv-2',
    senderId: 'contact-2',
    content: 'Actually, I just reviewed it. Looks great, approved!',
    timestamp: '2026-04-22T16:45:00.000Z',
    status: 'read'
  },

  // Conversation 3 — Julia Costa
  {
    id: 'msg-3-1',
    conversationId: 'conv-3',
    senderId: 'contact-3',
    content: 'Are we still meeting tomorrow at 10?',
    timestamp: '2026-04-23T11:00:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-3-2',
    conversationId: 'conv-3',
    senderId: 'me',
    content: 'Yes! See you there.',
    timestamp: '2026-04-23T11:05:00.000Z',
    status: 'sent'
  },

  // Conversation 4 — Pedro Oliveira
  {
    id: 'msg-4-1',
    conversationId: 'conv-4',
    senderId: 'contact-4',
    content: 'The deployment was successful. All services are running.',
    timestamp: '2026-04-23T08:00:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-4-2',
    conversationId: 'conv-4',
    senderId: 'contact-4',
    content: 'Can you monitor the logs for the next hour?',
    timestamp: '2026-04-23T08:15:00.000Z',
    status: 'delivered'
  },

  // Conversation 5 — Mariana Santos
  {
    id: 'msg-5-1',
    conversationId: 'conv-5',
    senderId: 'contact-5',
    content: 'Happy birthday! Hope you have a great day!',
    timestamp: '2026-04-21T09:00:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-5-2',
    conversationId: 'conv-5',
    senderId: 'me',
    content: 'Thank you so much, Mariana!',
    timestamp: '2026-04-21T09:30:00.000Z',
    status: 'read'
  }
]

function getLastMessage(conversationId: string): Message | null {
  const msgs = mockMessages.filter((m) => m.conversationId === conversationId)
  return msgs.length > 0 ? msgs[msgs.length - 1] : null
}

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    contact: contacts[0],
    lastMessage: getLastMessage('conv-1'),
    unreadCount: 0,
    isArchived: false,
    isTyping: false
  },
  {
    id: 'conv-2',
    contact: contacts[1],
    lastMessage: getLastMessage('conv-2'),
    unreadCount: 1,
    isArchived: false,
    isTyping: false
  },
  {
    id: 'conv-3',
    contact: contacts[2],
    lastMessage: getLastMessage('conv-3'),
    unreadCount: 0,
    isArchived: false,
    isTyping: false
  },
  {
    id: 'conv-4',
    contact: contacts[3],
    lastMessage: getLastMessage('conv-4'),
    unreadCount: 2,
    isArchived: false,
    isTyping: false
  },
  {
    id: 'conv-5',
    contact: contacts[4],
    lastMessage: getLastMessage('conv-5'),
    unreadCount: 0,
    isArchived: false,
    isTyping: false
  }
]

const replyPool: string[] = [
  'Got it, thanks!',
  'That makes sense.',
  'Let me think about it and get back to you.',
  'Sounds good to me!',
  'I agree, let us move forward with that.',
  'Sure, I will take care of it.',
  'Nice work!',
  'Can we discuss this in our next meeting?',
  'I am on it.',
  'Perfect, thanks for letting me know.'
]

export function getRandomReply(): string {
  return replyPool[Math.floor(Math.random() * replyPool.length)]
}

let messageCounter = 100

export function generateMessageId(): string {
  messageCounter += 1
  return `msg-gen-${messageCounter}`
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx vue-tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/services/delay.ts src/services/mockData.ts
git commit -m "feat: add mock data and delay helper for fake service layer"
```

---

### Task 5: Fake Service Layer

**Files:**
- Create: `src/services/conversationService.ts`, `src/services/messageService.ts`

- [ ] **Step 1: Create ConversationService**

Create `src/services/conversationService.ts`:

```typescript
import type { Conversation } from '@/types/chat'
import { simulateDelay } from './delay'
import { mockConversations } from './mockData'

const conversations: Conversation[] = [...mockConversations]

export const conversationService = {
  async getConversations(): Promise<Conversation[]> {
    await simulateDelay()
    return conversations
      .filter((c) => !c.isArchived)
      .map((c) => ({ ...c, contact: { ...c.contact } }))
  },

  async archiveConversation(id: string): Promise<void> {
    await simulateDelay()
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      conversation.isArchived = true
    }
  }
}
```

- [ ] **Step 2: Create MessageService**

Create `src/services/messageService.ts`:

```typescript
import type { Message } from '@/types/chat'
import { CURRENT_USER_ID } from '@/types/chat'
import { simulateDelay } from './delay'
import { mockMessages, getRandomReply, generateMessageId } from './mockData'

const messages: Message[] = [...mockMessages]

export const messageService = {
  async getMessages(conversationId: string): Promise<Message[]> {
    await simulateDelay()
    return messages
      .filter((m) => m.conversationId === conversationId)
      .map((m) => ({ ...m }))
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await simulateDelay(100, 300)
    const message: Message = {
      id: generateMessageId(),
      conversationId,
      senderId: CURRENT_USER_ID,
      content,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    messages.push(message)
    return { ...message }
  },

  async simulateReply(conversationId: string): Promise<{ delay: number; reply: Message }> {
    const delay = Math.floor(Math.random() * 2000) + 2000 // 2-4 seconds
    const reply: Message = {
      id: generateMessageId(),
      conversationId,
      senderId: `contact-${conversationId.split('-')[1]}`,
      content: getRandomReply(),
      timestamp: new Date(Date.now() + delay + 1500).toISOString(),
      status: 'delivered'
    }
    messages.push(reply)
    return { delay, reply: { ...reply } }
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx vue-tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/services/conversationService.ts src/services/messageService.ts
git commit -m "feat: add fake ConversationService and MessageService with async simulation"
```

---

### Task 6: Pinia Store — Tests First

**Files:**
- Create: `tests/stores/chatStore.spec.ts`

- [ ] **Step 1: Write store tests**

Create `tests/stores/chatStore.spec.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '@/stores/chatStore'
import type { Conversation, Message } from '@/types/chat'

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    contact: { id: 'contact-1', name: 'Alice' },
    lastMessage: {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'contact-1',
      content: 'Hello',
      timestamp: '2026-04-23T10:00:00.000Z',
      status: 'read'
    },
    unreadCount: 2,
    isArchived: false,
    isTyping: false
  },
  {
    id: 'conv-2',
    contact: { id: 'contact-2', name: 'Bob' },
    lastMessage: {
      id: 'msg-2',
      conversationId: 'conv-2',
      senderId: 'me',
      content: 'See you later',
      timestamp: '2026-04-23T11:00:00.000Z',
      status: 'sent'
    },
    unreadCount: 0,
    isArchived: false,
    isTyping: false
  }
]

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'contact-1',
    content: 'Hello',
    timestamp: '2026-04-23T10:00:00.000Z',
    status: 'read'
  }
]

vi.mock('@/services/conversationService', () => ({
  conversationService: {
    getConversations: vi.fn(() => Promise.resolve([...mockConversations.map((c) => ({ ...c, contact: { ...c.contact } }))])),
    archiveConversation: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/services/messageService', () => ({
  messageService: {
    getMessages: vi.fn(() => Promise.resolve([...mockMessages])),
    sendMessage: vi.fn((_convId: string, content: string) =>
      Promise.resolve({
        id: 'msg-new',
        conversationId: 'conv-1',
        senderId: 'me',
        content,
        timestamp: '2026-04-23T12:00:00.000Z',
        status: 'sent' as const
      })
    ),
    simulateReply: vi.fn(() =>
      Promise.resolve({
        delay: 100,
        reply: {
          id: 'msg-reply',
          conversationId: 'conv-1',
          senderId: 'contact-1',
          content: 'Auto reply',
          timestamp: '2026-04-23T12:01:00.000Z',
          status: 'delivered' as const
        }
      })
    )
  }
}))

describe('useChatStore', () => {
  let store: ReturnType<typeof useChatStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useChatStore()
    vi.clearAllMocks()
  })

  describe('fetchConversations', () => {
    it('sets loading state and populates conversations', async () => {
      expect(store.isLoadingConversations).toBe(false)

      const promise = store.fetchConversations()
      expect(store.isLoadingConversations).toBe(true)

      await promise
      expect(store.isLoadingConversations).toBe(false)
      expect(store.conversations).toHaveLength(2)
      expect(store.conversations[0].contact.name).toBe('Alice')
    })
  })

  describe('selectConversation', () => {
    it('sets active conversation and fetches messages', async () => {
      await store.fetchConversations()
      await store.selectConversation('conv-1')

      expect(store.activeConversationId).toBe('conv-1')
      expect(store.activeMessages).toHaveLength(1)
      expect(store.activeMessages[0].content).toBe('Hello')
    })

    it('resets unread count when selecting a conversation', async () => {
      await store.fetchConversations()
      expect(store.conversations[0].unreadCount).toBe(2)

      await store.selectConversation('conv-1')
      expect(store.conversations[0].unreadCount).toBe(0)
    })

    it('does not refetch messages if already cached', async () => {
      const { messageService } = await import('@/services/messageService')

      await store.fetchConversations()
      await store.selectConversation('conv-1')
      await store.selectConversation('conv-2')
      await store.selectConversation('conv-1')

      // conv-1 messages fetched once, conv-2 messages fetched once = 2 calls total
      expect(messageService.getMessages).toHaveBeenCalledTimes(2)
    })
  })

  describe('sendMessage', () => {
    it('appends message and updates lastMessage', async () => {
      vi.useFakeTimers()
      await store.fetchConversations()
      await store.selectConversation('conv-1')

      await store.sendMessage('Hi there')

      expect(store.activeMessages).toHaveLength(2)
      expect(store.activeMessages[1].content).toBe('Hi there')

      const conv = store.conversations.find((c) => c.id === 'conv-1')
      expect(conv?.lastMessage?.content).toBe('Hi there')

      vi.useRealTimers()
    })
  })

  describe('archiveConversation', () => {
    it('removes conversation from list', async () => {
      await store.fetchConversations()
      expect(store.conversations).toHaveLength(2)

      await store.archiveConversation('conv-1')
      expect(store.conversations).toHaveLength(1)
      expect(store.conversations[0].id).toBe('conv-2')
    })

    it('clears active if archived conversation was active', async () => {
      await store.fetchConversations()
      await store.selectConversation('conv-1')

      await store.archiveConversation('conv-1')
      expect(store.activeConversationId).toBeNull()
    })
  })

  describe('visibleConversations', () => {
    it('sorts conversations by last message timestamp descending', async () => {
      await store.fetchConversations()

      const visible = store.visibleConversations
      // conv-2 has timestamp 11:00, conv-1 has 10:00
      expect(visible[0].id).toBe('conv-2')
      expect(visible[1].id).toBe('conv-1')
    })

    it('filters conversations by search query matching contact name', async () => {
      await store.fetchConversations()
      store.setSearchQuery('alice')

      expect(store.visibleConversations).toHaveLength(1)
      expect(store.visibleConversations[0].contact.name).toBe('Alice')
    })

    it('filters conversations by search query matching last message content', async () => {
      await store.fetchConversations()
      store.setSearchQuery('see you')

      expect(store.visibleConversations).toHaveLength(1)
      expect(store.visibleConversations[0].id).toBe('conv-2')
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/stores/chatStore.spec.ts`
Expected: FAIL — `useChatStore` does not exist yet

- [ ] **Step 3: Commit failing tests**

```bash
git add tests/stores/chatStore.spec.ts
git commit -m "test: add failing store tests for useChatStore"
```

---

### Task 7: Pinia Store — Implementation

**Files:**
- Create: `src/stores/chatStore.ts`

- [ ] **Step 1: Implement useChatStore**

Create `src/stores/chatStore.ts`:

```typescript
import { defineStore } from 'pinia'
import type { Conversation, Message } from '@/types/chat'
import { conversationService } from '@/services/conversationService'
import { messageService } from '@/services/messageService'

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Record<string, Message[]>
  searchQuery: string
  isLoadingConversations: boolean
  isLoadingMessages: boolean
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    conversations: [],
    activeConversationId: null,
    messages: {},
    searchQuery: '',
    isLoadingConversations: false,
    isLoadingMessages: false
  }),

  getters: {
    activeConversation(state): Conversation | undefined {
      return state.conversations.find((c) => c.id === state.activeConversationId)
    },

    activeMessages(state): Message[] {
      if (!state.activeConversationId) return []
      return state.messages[state.activeConversationId] ?? []
    },

    visibleConversations(state): Conversation[] {
      const query = state.searchQuery.toLowerCase().trim()

      return state.conversations
        .filter((c) => !c.isArchived)
        .filter((c) => {
          if (!query) return true
          const nameMatch = c.contact.name.toLowerCase().includes(query)
          const messageMatch = c.lastMessage?.content.toLowerCase().includes(query) ?? false
          return nameMatch || messageMatch
        })
        .sort((a, b) => {
          const timeA = a.lastMessage?.timestamp ?? ''
          const timeB = b.lastMessage?.timestamp ?? ''
          return timeB.localeCompare(timeA)
        })
    }
  },

  actions: {
    async fetchConversations() {
      this.isLoadingConversations = true
      try {
        this.conversations = await conversationService.getConversations()
      } finally {
        this.isLoadingConversations = false
      }
    },

    async selectConversation(id: string) {
      this.activeConversationId = id

      const conversation = this.conversations.find((c) => c.id === id)
      if (conversation) {
        conversation.unreadCount = 0
      }

      if (!this.messages[id]) {
        this.isLoadingMessages = true
        try {
          this.messages[id] = await messageService.getMessages(id)
        } finally {
          this.isLoadingMessages = false
        }
      }
    },

    async sendMessage(content: string) {
      if (!this.activeConversationId) return

      const conversationId = this.activeConversationId
      const message = await messageService.sendMessage(conversationId, content)

      if (!this.messages[conversationId]) {
        this.messages[conversationId] = []
      }
      this.messages[conversationId].push(message)

      const conversation = this.conversations.find((c) => c.id === conversationId)
      if (conversation) {
        conversation.lastMessage = message
      }

      this.orchestrateReply(conversationId)
    },

    async orchestrateReply(conversationId: string) {
      const { delay, reply } = await messageService.simulateReply(conversationId)

      const conversation = this.conversations.find((c) => c.id === conversationId)
      if (!conversation) return

      conversation.isTyping = true

      setTimeout(() => {
        conversation.isTyping = false

        if (!this.messages[conversationId]) {
          this.messages[conversationId] = []
        }
        this.messages[conversationId].push(reply)
        conversation.lastMessage = reply

        if (this.activeConversationId !== conversationId) {
          conversation.unreadCount += 1
        }
      }, delay)
    },

    async archiveConversation(id: string) {
      await conversationService.archiveConversation(id)

      this.conversations = this.conversations.filter((c) => c.id !== id)

      if (this.activeConversationId === id) {
        this.activeConversationId = null
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  }
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run tests/stores/chatStore.spec.ts`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add src/stores/chatStore.ts
git commit -m "feat: implement useChatStore with state, getters, and actions"
```

---

### Task 8: Composables — Tests First

**Files:**
- Create: `tests/composables/useCharacterLimit.spec.ts`, `tests/composables/useDebounce.spec.ts`

- [ ] **Step 1: Write useCharacterLimit tests**

Create `tests/composables/useCharacterLimit.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { useCharacterLimit } from '@/composables/useCharacterLimit'

describe('useCharacterLimit', () => {
  it('initializes with empty text and full remaining count', () => {
    const { text, remaining, isOverLimit, percentage } = useCharacterLimit(100)

    expect(text.value).toBe('')
    expect(remaining.value).toBe(100)
    expect(isOverLimit.value).toBe(false)
    expect(percentage.value).toBe(0)
  })

  it('updates remaining count when text changes', () => {
    const { text, remaining } = useCharacterLimit(100)

    text.value = 'Hello'
    expect(remaining.value).toBe(95)
  })

  it('calculates percentage correctly', () => {
    const { text, percentage } = useCharacterLimit(200)

    text.value = 'a'.repeat(100)
    expect(percentage.value).toBe(50)
  })

  it('detects when text exceeds limit', () => {
    const { text, isOverLimit, remaining } = useCharacterLimit(10)

    text.value = 'a'.repeat(11)
    expect(isOverLimit.value).toBe(true)
    expect(remaining.value).toBe(-1)
  })

  it('is not over limit when exactly at the limit', () => {
    const { text, isOverLimit, remaining } = useCharacterLimit(5)

    text.value = 'abcde'
    expect(isOverLimit.value).toBe(false)
    expect(remaining.value).toBe(0)
  })
})
```

- [ ] **Step 2: Write useDebounce tests**

Create `tests/composables/useDebounce.spec.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('returns initial value immediately', () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    expect(debounced.value).toBe('hello')
  })

  it('does not update immediately when source changes', async () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    source.value = 'world'
    await nextTick()

    expect(debounced.value).toBe('hello')
  })

  it('updates after the delay elapses', async () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    source.value = 'world'
    await nextTick()

    vi.advanceTimersByTime(300)
    await nextTick()

    expect(debounced.value).toBe('world')
  })

  it('resets timer on rapid changes and only emits the last value', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 300)

    source.value = 'b'
    await nextTick()
    vi.advanceTimersByTime(100)

    source.value = 'c'
    await nextTick()
    vi.advanceTimersByTime(100)

    source.value = 'd'
    await nextTick()
    vi.advanceTimersByTime(300)
    await nextTick()

    expect(debounced.value).toBe('d')
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run tests/composables/`
Expected: FAIL — composables do not exist yet

- [ ] **Step 4: Commit failing tests**

```bash
git add tests/composables/
git commit -m "test: add failing tests for useCharacterLimit and useDebounce composables"
```

---

### Task 9: Composables — Implementation

**Files:**
- Create: `src/composables/useCharacterLimit.ts`, `src/composables/useDebounce.ts`, `src/composables/useResponsive.ts`, `src/composables/useAutoScroll.ts`

- [ ] **Step 1: Implement useCharacterLimit**

Create `src/composables/useCharacterLimit.ts`:

```typescript
import { ref, computed } from 'vue'

export function useCharacterLimit(maxLength: number) {
  const text = ref('')

  const remaining = computed(() => maxLength - text.value.length)
  const isOverLimit = computed(() => text.value.length > maxLength)
  const percentage = computed(() => (text.value.length / maxLength) * 100)

  return {
    text,
    remaining,
    isOverLimit,
    percentage
  }
}
```

- [ ] **Step 2: Implement useDebounce**

Create `src/composables/useDebounce.ts`:

```typescript
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay: number): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}
```

- [ ] **Step 3: Implement useResponsive**

Create `src/composables/useResponsive.ts`:

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

const BP_MOBILE = 768
const BP_TABLET = 1024

export function useResponsive() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  let mobileQuery: MediaQueryList
  let tabletQuery: MediaQueryList

  function update() {
    isMobile.value = mobileQuery.matches
    isTablet.value = tabletQuery.matches
    isDesktop.value = !mobileQuery.matches && !tabletQuery.matches
  }

  onMounted(() => {
    mobileQuery = window.matchMedia(`(max-width: ${BP_MOBILE - 1}px)`)
    tabletQuery = window.matchMedia(`(min-width: ${BP_MOBILE}px) and (max-width: ${BP_TABLET - 1}px)`)

    mobileQuery.addEventListener('change', update)
    tabletQuery.addEventListener('change', update)

    update()
  })

  onUnmounted(() => {
    mobileQuery?.removeEventListener('change', update)
    tabletQuery?.removeEventListener('change', update)
  })

  return { isMobile, isTablet, isDesktop }
}
```

- [ ] **Step 4: Implement useAutoScroll**

Create `src/composables/useAutoScroll.ts`:

```typescript
import { watch, nextTick, type Ref } from 'vue'

const SCROLL_THRESHOLD = 100

export function useAutoScroll(containerRef: Ref<HTMLElement | null>, dependency: Ref<unknown[]>) {
  function isNearBottom(): boolean {
    const el = containerRef.value
    if (!el) return true
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
  }

  function scrollToBottom() {
    const el = containerRef.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  watch(
    dependency,
    async () => {
      if (isNearBottom()) {
        await nextTick()
        scrollToBottom()
      }
    },
    { deep: true }
  )

  return { scrollToBottom }
}
```

- [ ] **Step 5: Run composable tests to verify they pass**

Run: `npx vitest run tests/composables/`
Expected: All tests PASS

- [ ] **Step 6: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 7: Commit**

```bash
git add src/composables/
git commit -m "feat: implement composables for character limit, debounce, responsive, and auto-scroll"
```

---

### Task 10: Shared Components

**Files:**
- Create: `src/components/shared/UserAvatar.vue`

- [ ] **Step 1: Create UserAvatar component**

Create `src/components/shared/UserAvatar.vue`:

```vue
<template>
  <div
    class="user-avatar"
    :class="`user-avatar--${size}`"
    :aria-label="`Avatar of ${name}`"
    role="img"
  >
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="name"
      class="user-avatar__image"
    />
    <span v-else class="user-avatar__initials">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    avatarUrl?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md'
  }
)

const initials = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

$sizes: (
  sm: 32px,
  md: 40px,
  lg: 48px,
);

.user-avatar {
  border-radius: $radius-full;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-primary;
  color: $color-outgoing-text;
  font-weight: $font-weight-semibold;
  flex-shrink: 0;

  @each $name, $dimension in $sizes {
    &--#{$name} {
      width: $dimension;
      height: $dimension;
      font-size: $dimension * 0.35;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: $radius-full;
    object-fit: cover;
  }

  &__initials {
    line-height: 1;
    user-select: none;
  }
}
</style>
```

- [ ] **Step 2: Verify it renders**

Run: `npm run dev`
Temporarily import and render `<UserAvatar name="Ana Silva" />` in `ChatView.vue` to verify it shows "AS" initials in a purple circle.
Remove the temporary usage after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/UserAvatar.vue
git commit -m "feat: add UserAvatar component with initials fallback"
```

---

### Task 11: Sidebar Presentational Components — Tests First

**Files:**
- Create: `tests/components/ConversationItem.spec.ts`

- [ ] **Step 1: Write ConversationItem tests**

Create `tests/components/ConversationItem.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConversationItem from '@/components/sidebar/ConversationItem.vue'
import type { Conversation } from '@/types/chat'

const baseConversation: Conversation = {
  id: 'conv-1',
  contact: { id: 'contact-1', name: 'Alice Johnson' },
  lastMessage: {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'contact-1',
    content: 'Hello there!',
    timestamp: '2026-04-23T10:30:00.000Z',
    status: 'read'
  },
  unreadCount: 0,
  isArchived: false,
  isTyping: false
}

describe('ConversationItem', () => {
  it('renders contact name', () => {
    const wrapper = mount(ConversationItem, {
      props: { conversation: baseConversation, isActive: false }
    })

    expect(wrapper.text()).toContain('Alice Johnson')
  })

  it('renders last message preview', () => {
    const wrapper = mount(ConversationItem, {
      props: { conversation: baseConversation, isActive: false }
    })

    expect(wrapper.text()).toContain('Hello there!')
  })

  it('renders unread badge when unreadCount > 0', () => {
    const conversation = { ...baseConversation, unreadCount: 3 }
    const wrapper = mount(ConversationItem, {
      props: { conversation, isActive: false }
    })

    const badge = wrapper.find('.conversation-item__badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })

  it('does not render unread badge when unreadCount is 0', () => {
    const wrapper = mount(ConversationItem, {
      props: { conversation: baseConversation, isActive: false }
    })

    expect(wrapper.find('.conversation-item__badge').exists()).toBe(false)
  })

  it('shows typing state instead of message preview', () => {
    const conversation = { ...baseConversation, isTyping: true }
    const wrapper = mount(ConversationItem, {
      props: { conversation, isActive: false }
    })

    expect(wrapper.text()).toContain('Typing')
    expect(wrapper.find('.conversation-item--typing').exists()).toBe(true)
  })

  it('applies active class when isActive is true', () => {
    const wrapper = mount(ConversationItem, {
      props: { conversation: baseConversation, isActive: true }
    })

    expect(wrapper.find('.conversation-item--active').exists()).toBe(true)
  })

  it('emits select event when clicked', async () => {
    const wrapper = mount(ConversationItem, {
      props: { conversation: baseConversation, isActive: false }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')![0]).toEqual(['conv-1'])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/components/ConversationItem.spec.ts`
Expected: FAIL — component does not exist yet

- [ ] **Step 3: Commit failing tests**

```bash
git add tests/components/ConversationItem.spec.ts
git commit -m "test: add failing tests for ConversationItem component"
```

---

### Task 12: Sidebar Presentational Components — Implementation

**Files:**
- Create: `src/components/sidebar/SidebarHeader.vue`, `src/components/sidebar/SearchInput.vue`, `src/components/sidebar/ConversationItem.vue`, `src/components/sidebar/ConversationList.vue`

- [ ] **Step 1: Create SidebarHeader**

Create `src/components/sidebar/SidebarHeader.vue`:

```vue
<template>
  <div class="sidebar-header">
    <h1 class="sidebar-header__title">Chats</h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.sidebar-header {
  padding: $spacing-base $spacing-lg;
  border-bottom: 1px solid $color-border;

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}
</style>
```

- [ ] **Step 2: Create SearchInput**

Create `src/components/sidebar/SearchInput.vue`:

```vue
<template>
  <div class="search-input">
    <input
      type="text"
      class="search-input__field"
      :value="modelValue"
      placeholder="Search conversations..."
      aria-label="Search conversations"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.search-input {
  padding: $spacing-sm $spacing-lg;

  &__field {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    background-color: $color-background;
    border-radius: $radius-md;
    font-size: $font-size-md;
    color: $color-text-primary;
    transition: box-shadow $transition-fast;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:focus {
      box-shadow: 0 0 0 2px $color-primary;
    }
  }
}
</style>
```

- [ ] **Step 3: Create ConversationItem**

Create `src/components/sidebar/ConversationItem.vue`:

```vue
<template>
  <div
    class="conversation-item"
    :class="{
      'conversation-item--active': isActive,
      'conversation-item--typing': conversation.isTyping
    }"
    role="button"
    tabindex="0"
    :aria-label="`Conversation with ${conversation.contact.name}`"
    @click="emit('select', conversation.id)"
    @keydown.enter="emit('select', conversation.id)"
  >
    <UserAvatar
      :name="conversation.contact.name"
      :avatar-url="conversation.contact.avatarUrl"
      size="md"
      class="conversation-item__avatar"
    />

    <div class="conversation-item__content">
      <div class="conversation-item__top">
        <span class="conversation-item__name">{{ conversation.contact.name }}</span>
        <span class="conversation-item__time">{{ formattedTime }}</span>
      </div>

      <div class="conversation-item__bottom">
        <span v-if="conversation.isTyping" class="conversation-item__preview conversation-item__preview--typing">
          Typing...
        </span>
        <span v-else class="conversation-item__preview">
          {{ conversation.lastMessage?.content ?? '' }}
        </span>

        <span
          v-if="conversation.unreadCount > 0"
          class="conversation-item__badge"
          aria-label="Unread messages"
        >
          {{ conversation.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Conversation } from '@/types/chat'
import UserAvatar from '@/components/shared/UserAvatar.vue'

const props = defineProps<{
  conversation: Conversation
  isActive: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

const formattedTime = computed(() => {
  if (!props.conversation.lastMessage) return ''

  const date = new Date(props.conversation.lastMessage.timestamp)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.conversation-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover {
    background-color: $color-background;
  }

  &--active {
    background-color: $color-background;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xs;
  }

  &__name {
    font-weight: $font-weight-semibold;
    font-size: $font-size-md;
    @include text-truncate;
  }

  &__time {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    flex-shrink: 0;
    margin-left: $spacing-sm;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__preview {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    @include text-truncate;
    flex: 1;

    &--typing {
      color: $color-primary;
      font-style: italic;
    }
  }

  &__badge {
    background-color: $color-unread-badge;
    color: $color-outgoing-text;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    min-width: 20px;
    height: 20px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: $spacing-sm;
    padding: 0 $spacing-xs;
  }
}
</style>
```

- [ ] **Step 4: Create ConversationList**

Create `src/components/sidebar/ConversationList.vue`:

```vue
<template>
  <div class="conversation-list" role="list" aria-label="Conversations">
    <ConversationItem
      v-for="conversation in conversations"
      :key="conversation.id"
      :conversation="conversation"
      :is-active="conversation.id === activeConversationId"
      role="listitem"
      @select="emit('select', $event)"
    />

    <div v-if="conversations.length === 0" class="conversation-list__empty">
      <p>No conversations found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '@/types/chat'
import ConversationItem from './ConversationItem.vue'

defineProps<{
  conversations: Conversation[]
  activeConversationId: string | null
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.conversation-list {
  @include scrollable;
  flex: 1;

  &__empty {
    padding: $spacing-xl;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-md;
  }
}
</style>
```

- [ ] **Step 5: Run ConversationItem tests**

Run: `npx vitest run tests/components/ConversationItem.spec.ts`
Expected: All tests PASS

- [ ] **Step 6: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/sidebar/
git commit -m "feat: add sidebar presentational components (SidebarHeader, SearchInput, ConversationItem, ConversationList)"
```

---

### Task 13: Chat Presentational Components — Tests First

**Files:**
- Create: `tests/components/MessageBubble.spec.ts`, `tests/components/DateDivider.spec.ts`, `tests/components/MessageComposer.spec.ts`

- [ ] **Step 1: Write MessageBubble tests**

Create `tests/components/MessageBubble.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import type { Message } from '@/types/chat'

const incomingMessage: Message = {
  id: 'msg-1',
  conversationId: 'conv-1',
  senderId: 'contact-1',
  content: 'Hello there!',
  timestamp: '2026-04-23T10:30:00.000Z',
  status: 'read'
}

const outgoingMessage: Message = {
  id: 'msg-2',
  conversationId: 'conv-1',
  senderId: 'me',
  content: 'Hi! How are you?',
  timestamp: '2026-04-23T10:31:00.000Z',
  status: 'sent'
}

describe('MessageBubble', () => {
  it('renders message content', () => {
    const wrapper = mount(MessageBubble, {
      props: { message: incomingMessage }
    })

    expect(wrapper.text()).toContain('Hello there!')
  })

  it('applies incoming class for non-current-user messages', () => {
    const wrapper = mount(MessageBubble, {
      props: { message: incomingMessage }
    })

    expect(wrapper.find('.message-bubble--incoming').exists()).toBe(true)
    expect(wrapper.find('.message-bubble--outgoing').exists()).toBe(false)
  })

  it('applies outgoing class for current user messages', () => {
    const wrapper = mount(MessageBubble, {
      props: { message: outgoingMessage }
    })

    expect(wrapper.find('.message-bubble--outgoing').exists()).toBe(true)
    expect(wrapper.find('.message-bubble--incoming').exists()).toBe(false)
  })

  it('renders formatted time', () => {
    const wrapper = mount(MessageBubble, {
      props: { message: incomingMessage }
    })

    expect(wrapper.find('.message-bubble__time').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Write DateDivider tests**

Create `tests/components/DateDivider.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateDivider from '@/components/chat/DateDivider.vue'

describe('DateDivider', () => {
  it('renders the formatted date', () => {
    const wrapper = mount(DateDivider, {
      props: { date: '2026-04-23' }
    })

    expect(wrapper.text()).toContain('April')
    expect(wrapper.text()).toContain('23')
  })

  it('renders Today for current date', () => {
    const today = new Date().toISOString().split('T')[0]
    const wrapper = mount(DateDivider, {
      props: { date: today }
    })

    expect(wrapper.text()).toContain('Today')
  })
})
```

- [ ] **Step 3: Write MessageComposer tests**

Create `tests/components/MessageComposer.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageComposer from '@/components/chat/MessageComposer.vue'

describe('MessageComposer', () => {
  it('emits send event with message content on Enter', async () => {
    const wrapper = mount(MessageComposer)

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello world')
    await textarea.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('send')).toHaveLength(1)
    expect(wrapper.emitted('send')![0]).toEqual(['Hello world'])
  })

  it('does not emit send on Shift+Enter (allows newline)', async () => {
    const wrapper = mount(MessageComposer)

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: true })

    expect(wrapper.emitted('send')).toBeUndefined()
  })

  it('does not emit send when message is empty', async () => {
    const wrapper = mount(MessageComposer)

    const textarea = wrapper.find('textarea')
    await textarea.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('send')).toBeUndefined()
  })

  it('clears textarea after sending', async () => {
    const wrapper = mount(MessageComposer)

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello world')
    await textarea.trigger('keydown', { key: 'Enter' })

    expect((textarea.element as HTMLTextAreaElement).value).toBe('')
  })
})
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npx vitest run tests/components/MessageBubble.spec.ts tests/components/DateDivider.spec.ts tests/components/MessageComposer.spec.ts`
Expected: FAIL — components do not exist yet

- [ ] **Step 5: Commit failing tests**

```bash
git add tests/components/MessageBubble.spec.ts tests/components/DateDivider.spec.ts tests/components/MessageComposer.spec.ts
git commit -m "test: add failing tests for MessageBubble, DateDivider, and MessageComposer"
```

---

### Task 14: Chat Presentational Components — Implementation

**Files:**
- Create: `src/components/chat/ChatHeader.vue`, `src/components/chat/DateDivider.vue`, `src/components/chat/MessageBubble.vue`, `src/components/chat/TypingIndicator.vue`, `src/components/chat/MessageList.vue`, `src/components/chat/MessageComposer.vue`

- [ ] **Step 1: Create ChatHeader**

Create `src/components/chat/ChatHeader.vue`:

```vue
<template>
  <div class="chat-header">
    <button
      v-if="showBackButton"
      class="chat-header__back"
      aria-label="Back to conversations"
      @click="emit('back')"
    >
      &larr;
    </button>

    <UserAvatar
      :name="contactName"
      :avatar-url="contactAvatarUrl"
      size="md"
      class="chat-header__avatar"
    />

    <div class="chat-header__info">
      <span class="chat-header__name">{{ contactName }}</span>
    </div>

    <button
      class="chat-header__archive"
      aria-label="Archive conversation"
      @click="emit('archive')"
    >
      Archive
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  contactName: string
  contactAvatarUrl?: string
  showBackButton?: boolean
}>()

const emit = defineEmits<{
  archive: []
  back: []
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.chat-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid $color-border;
  background-color: $color-surface;

  &__back {
    font-size: $font-size-lg;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-sm;
    transition: background-color $transition-fast;

    &:hover {
      background-color: $color-background;
    }
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-weight: $font-weight-semibold;
    font-size: $font-size-base;
  }

  &__archive {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-md;
    transition: background-color $transition-fast, color $transition-fast;

    &:hover {
      background-color: $color-background;
      color: $color-danger;
    }
  }
}
</style>
```

- [ ] **Step 2: Create DateDivider**

Create `src/components/chat/DateDivider.vue`:

```vue
<template>
  <div class="date-divider" role="separator">
    <span class="date-divider__text">{{ formattedDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: string
}>()

const formattedDate = computed(() => {
  const dateObj = new Date(props.date + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateObj.toDateString() === today.toDateString()) {
    return 'Today'
  }

  if (dateObj.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.date-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-base 0;

  &__text {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    background-color: $color-surface;
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-lg;
    font-weight: $font-weight-medium;
  }
}
</style>
```

- [ ] **Step 3: Create MessageBubble**

Create `src/components/chat/MessageBubble.vue`:

```vue
<template>
  <div
    class="message-bubble"
    :class="{
      'message-bubble--incoming': !isOutgoing,
      'message-bubble--outgoing': isOutgoing
    }"
  >
    <div class="message-bubble__content">
      <p class="message-bubble__text">{{ message.content }}</p>
      <span class="message-bubble__time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types/chat'
import { CURRENT_USER_ID } from '@/types/chat'

const props = defineProps<{
  message: Message
}>()

const isOutgoing = computed(() => props.message.senderId === CURRENT_USER_ID)

const formattedTime = computed(() => {
  const date = new Date(props.message.timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.message-bubble {
  display: flex;
  margin-bottom: $spacing-sm;
  animation: fade-in 0.2s ease;

  &--incoming {
    justify-content: flex-start;

    .message-bubble__content {
      background-color: $color-incoming-bubble;
      color: $color-text-primary;
      border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
    }
  }

  &--outgoing {
    justify-content: flex-end;

    .message-bubble__content {
      background-color: $color-outgoing-bubble;
      color: $color-outgoing-text;
      border-radius: $radius-lg $radius-lg $radius-sm $radius-lg;
    }

    .message-bubble__time {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__content {
    max-width: 70%;
    padding: $spacing-sm $spacing-md;
  }

  &__text {
    font-size: $font-size-md;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &__time {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    display: block;
    text-align: right;
    margin-top: $spacing-xs;
  }
}
</style>
```

- [ ] **Step 4: Create TypingIndicator**

Create `src/components/chat/TypingIndicator.vue`:

```vue
<template>
  <div class="typing-indicator" aria-label="Contact is typing">
    <div class="typing-indicator__bubble">
      <span class="typing-indicator__dot"></span>
      <span class="typing-indicator__dot"></span>
      <span class="typing-indicator__dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.typing-indicator {
  display: flex;
  justify-content: flex-start;
  margin-bottom: $spacing-sm;
  animation: fade-in 0.2s ease;

  &__bubble {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-md $spacing-base;
    background-color: $color-incoming-bubble;
    border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: $radius-full;
    background-color: $color-typing-dot;
    animation: typing-bounce 1.4s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}
</style>
```

- [ ] **Step 5: Create MessageList**

Create `src/components/chat/MessageList.vue`:

```vue
<template>
  <div ref="listRef" class="message-list" role="log" aria-label="Messages">
    <template v-for="(group, index) in groupedMessages" :key="group.date">
      <DateDivider :date="group.date" />

      <MessageBubble
        v-for="message in group.messages"
        :key="message.id"
        :message="message"
      />
    </template>

    <TypingIndicator v-if="isTyping" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Message } from '@/types/chat'
import { useAutoScroll } from '@/composables/useAutoScroll'
import DateDivider from './DateDivider.vue'
import MessageBubble from './MessageBubble.vue'
import TypingIndicator from './TypingIndicator.vue'

const props = defineProps<{
  messages: Message[]
  isTyping: boolean
}>()

const listRef = ref<HTMLElement | null>(null)

interface MessageGroup {
  date: string
  messages: Message[]
}

const groupedMessages = computed<MessageGroup[]>(() => {
  const groups: MessageGroup[] = []

  for (const message of props.messages) {
    const date = message.timestamp.split('T')[0]
    const lastGroup = groups[groups.length - 1]

    if (lastGroup && lastGroup.date === date) {
      lastGroup.messages.push(message)
    } else {
      groups.push({ date, messages: [message] })
    }
  }

  return groups
})

const messagesRef = computed(() => props.messages)
const { scrollToBottom } = useAutoScroll(listRef, messagesRef)

defineExpose({ scrollToBottom })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.message-list {
  @include scrollable;
  flex: 1;
  padding: $spacing-base $spacing-lg;
  display: flex;
  flex-direction: column;
}
</style>
```

- [ ] **Step 6: Create MessageComposer**

Create `src/components/chat/MessageComposer.vue`:

```vue
<template>
  <div class="message-composer">
    <div class="message-composer__input-wrapper">
      <textarea
        ref="textareaRef"
        v-model="characterLimit.text.value"
        class="message-composer__textarea"
        :class="{ 'message-composer__textarea--over-limit': characterLimit.isOverLimit.value }"
        placeholder="Type a message..."
        aria-label="Type a message"
        rows="1"
        @keydown="onKeydown"
        @input="autoResize"
      ></textarea>
    </div>

    <div class="message-composer__footer">
      <span class="message-composer__hint">
        <kbd>Shift</kbd> + <kbd>Enter</kbd> for new line
      </span>

      <div class="message-composer__actions">
        <span
          class="message-composer__counter"
          :class="{ 'message-composer__counter--over': characterLimit.isOverLimit.value }"
        >
          {{ characterLimit.remaining.value }}
        </span>

        <button
          class="message-composer__send"
          :disabled="!canSend"
          aria-label="Send message"
          @click="send"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCharacterLimit } from '@/composables/useCharacterLimit'

const MAX_LENGTH = 500

const emit = defineEmits<{
  send: [content: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const characterLimit = useCharacterLimit(MAX_LENGTH)

const canSend = computed(() => {
  const text = characterLimit.text.value.trim()
  return text.length > 0 && !characterLimit.isOverLimit.value
})

function send() {
  if (!canSend.value) return

  emit('send', characterLimit.text.value.trim())
  characterLimit.text.value = ''
  resetTextareaHeight()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    send()
  }
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 120)}px`
}

function resetTextareaHeight() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.message-composer {
  padding: $spacing-md $spacing-lg;
  border-top: 1px solid $color-border;
  background-color: $color-surface;

  &__input-wrapper {
    margin-bottom: $spacing-sm;
  }

  &__textarea {
    width: 100%;
    resize: none;
    padding: $spacing-sm $spacing-md;
    background-color: $color-background;
    border-radius: $radius-md;
    font-size: $font-size-md;
    line-height: 1.4;
    min-height: 40px;
    max-height: 120px;
    transition: box-shadow $transition-fast;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:focus {
      box-shadow: 0 0 0 2px $color-primary;
    }

    &--over-limit {
      box-shadow: 0 0 0 2px $color-danger;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__hint {
    font-size: $font-size-xs;
    color: $color-text-secondary;

    kbd {
      background-color: $color-background;
      padding: 1px $spacing-xs;
      border-radius: $radius-sm;
      font-size: $font-size-xs;
      border: 1px solid $color-border;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__counter {
    font-size: $font-size-xs;
    color: $color-text-secondary;

    &--over {
      color: $color-danger;
      font-weight: $font-weight-semibold;
    }
  }

  &__send {
    background-color: $color-primary;
    color: $color-outgoing-text;
    padding: $spacing-sm $spacing-base;
    border-radius: $radius-md;
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    transition: opacity $transition-fast;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      opacity: 0.9;
    }
  }
}
</style>
```

- [ ] **Step 7: Run component tests**

Run: `npx vitest run tests/components/`
Expected: All tests PASS

- [ ] **Step 8: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/chat/
git commit -m "feat: add chat presentational components (ChatHeader, DateDivider, MessageBubble, TypingIndicator, MessageList, MessageComposer)"
```

---

### Task 15: Container Components

**Files:**
- Create: `src/components/sidebar/ConversationSidebar.vue`, `src/components/chat/ChatMain.vue`

- [ ] **Step 1: Create ConversationSidebar**

Create `src/components/sidebar/ConversationSidebar.vue`:

```vue
<template>
  <aside class="conversation-sidebar" aria-label="Conversation list">
    <SidebarHeader />

    <SearchInput v-model="searchQuery" />

    <div v-if="store.isLoadingConversations" class="conversation-sidebar__loading">
      Loading conversations...
    </div>

    <ConversationList
      v-else
      :conversations="store.visibleConversations"
      :active-conversation-id="store.activeConversationId"
      @select="onSelect"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useDebounce } from '@/composables/useDebounce'
import SidebarHeader from './SidebarHeader.vue'
import SearchInput from './SearchInput.vue'
import ConversationList from './ConversationList.vue'

const store = useChatStore()

const emit = defineEmits<{
  select: [id: string]
}>()

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)

watch(debouncedQuery, (query) => {
  store.setSearchQuery(query)
})

function onSelect(id: string) {
  store.selectConversation(id)
  emit('select', id)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.conversation-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-surface;
  border-right: 1px solid $color-border;

  &__loading {
    padding: $spacing-xl;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-md;
  }
}
</style>
```

- [ ] **Step 2: Create ChatMain**

Create `src/components/chat/ChatMain.vue`:

```vue
<template>
  <div class="chat-main">
    <template v-if="store.activeConversation">
      <ChatHeader
        :contact-name="store.activeConversation.contact.name"
        :contact-avatar-url="store.activeConversation.contact.avatarUrl"
        :show-back-button="showBackButton"
        @archive="onArchive"
        @back="emit('back')"
      />

      <div v-if="store.isLoadingMessages" class="chat-main__loading">
        Loading messages...
      </div>

      <MessageList
        v-else
        :messages="store.activeMessages"
        :is-typing="store.activeConversation.isTyping"
      />

      <MessageComposer @send="onSend" />
    </template>

    <div v-else class="chat-main__empty">
      <p class="chat-main__empty-text">Select a conversation to start chatting</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import MessageComposer from './MessageComposer.vue'

defineProps<{
  showBackButton?: boolean
}>()

const store = useChatStore()

const emit = defineEmits<{
  back: []
}>()

function onSend(content: string) {
  store.sendMessage(content)
}

async function onArchive() {
  if (!store.activeConversationId) return
  await store.archiveConversation(store.activeConversationId)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.chat-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-surface;

  &__loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text-secondary;
    font-size: $font-size-md;
  }

  &__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__empty-text {
    color: $color-text-secondary;
    font-size: $font-size-base;
  }
}
</style>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx vue-tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/ConversationSidebar.vue src/components/chat/ChatMain.vue
git commit -m "feat: add container components (ConversationSidebar, ChatMain)"
```

---

### Task 16: Layout and Responsive Shell

**Files:**
- Create: `src/layouts/ChatLayout.vue`
- Modify: `src/views/ChatView.vue`

- [ ] **Step 1: Create ChatLayout**

Create `src/layouts/ChatLayout.vue`:

```vue
<template>
  <div class="chat-layout">
    <div
      v-show="showSidebar"
      class="chat-layout__sidebar"
    >
      <ConversationSidebar @select="onConversationSelect" />
    </div>

    <div
      v-show="showChat"
      class="chat-layout__main"
    >
      <ChatMain
        :show-back-button="isMobile"
        @back="onBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useResponsive } from '@/composables/useResponsive'
import { useChatStore } from '@/stores/chatStore'
import ConversationSidebar from '@/components/sidebar/ConversationSidebar.vue'
import ChatMain from '@/components/chat/ChatMain.vue'

const { isMobile } = useResponsive()
const store = useChatStore()

const showChatPanel = ref(false)

const showSidebar = ref(true)
const showChat = ref(true)

watch(isMobile, (mobile) => {
  if (mobile) {
    showSidebar.value = !showChatPanel.value
    showChat.value = showChatPanel.value
  } else {
    showSidebar.value = true
    showChat.value = true
  }
}, { immediate: true })

function onConversationSelect() {
  if (isMobile.value) {
    showChatPanel.value = true
    showSidebar.value = false
    showChat.value = true
  }
}

function onBack() {
  if (isMobile.value) {
    showChatPanel.value = false
    showSidebar.value = true
    showChat.value = false
    store.activeConversationId = null
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.chat-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: $color-background;

  &__sidebar {
    width: $sidebar-width;
    flex-shrink: 0;
    height: 100%;

    @include tablet {
      width: $sidebar-width-tablet;
    }

    @include mobile {
      width: 100%;
    }
  }

  &__main {
    flex: 1;
    min-width: 0;
    height: 100%;

    @include mobile {
      width: 100%;
    }
  }
}
</style>
```

- [ ] **Step 2: Update ChatView**

Replace `src/views/ChatView.vue` with:

```vue
<template>
  <ChatLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import ChatLayout from '@/layouts/ChatLayout.vue'

const store = useChatStore()

onMounted(() => {
  store.fetchConversations()
})
</script>
```

- [ ] **Step 3: Verify the full app works in browser**

Run: `npm run dev`
Expected:
- Sidebar shows on the left with conversation list
- Clicking a conversation shows messages on the right
- Sending a message triggers typing indicator and auto-reply
- Archive button removes conversation
- Search filters conversations
- On mobile viewport: only one panel visible, back button navigates

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ChatLayout.vue src/views/ChatView.vue
git commit -m "feat: add ChatLayout with responsive panel switching and wire up ChatView"
```

---

### Task 17: Visual Polish and Animations

**Files:**
- Modify: `src/layouts/ChatLayout.vue`, `src/components/chat/MessageBubble.vue`

- [ ] **Step 1: Add mobile slide transitions to ChatLayout**

In `src/layouts/ChatLayout.vue`, wrap the sidebar and main panels with transition handling. Update the style section to add:

```scss
  &__sidebar {
    width: $sidebar-width;
    flex-shrink: 0;
    height: 100%;

    @include tablet {
      width: $sidebar-width-tablet;
    }

    @include mobile {
      width: 100%;
      animation: slide-in-left 0.25s ease;
    }
  }

  &__main {
    flex: 1;
    min-width: 0;
    height: 100%;

    @include mobile {
      width: 100%;
      animation: slide-in-right 0.25s ease;
    }
  }
```

- [ ] **Step 2: Verify animations work**

Run: `npm run dev`
Expected:
- On mobile viewport, switching between sidebar and chat has a subtle slide animation
- Message bubbles fade in when they appear
- Typing indicator dots bounce with staggered timing

- [ ] **Step 3: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "style: add subtle slide animations for mobile panel transitions"
```

---

### Task 18: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Run full test suite**

Run: `npx vitest run`
Expected: All tests PASS (~15-20 tests)

- [ ] **Step 2: TypeScript check**

Run: `npx vue-tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Manual verification in browser**

Run: `npm run dev`
Verify each feature:
1. Conversations load with loading state
2. Click conversation → messages appear with loading state
3. Unread badge disappears when conversation selected
4. Type and send a message → appears in thread, lastMessage updates in sidebar
5. After sending, typing indicator appears → auto-reply arrives
6. Archive button removes conversation, shows empty state
7. Search filters conversations by name and message content
8. Character counter works, shows warning at limit
9. Enter sends, Shift+Enter adds newline
10. Resize to mobile → single panel, back button works
11. Resize to tablet → narrower sidebar
12. Animations are subtle and smooth

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 5: Commit any final fixes if needed**

Only if issues found in verification steps above.
