import type { Conversation } from '@/types/chat'
import { mockUsers } from './users'

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: mockUsers[0],
    lastMessage: 'Sure, I will send the report by end of day',
    lastMessageAt: '2026-04-23T14:32:00Z',
    unreadCount: 2,
    isTyping: false,
    isArchived: false,
  },
  {
    id: 'conv-2',
    participant: mockUsers[1],
    lastMessage: 'Can we reschedule the meeting to Thursday?',
    lastMessageAt: '2026-04-23T13:15:00Z',
    unreadCount: 0,
    isTyping: true,
    isArchived: false,
  },
  {
    id: 'conv-3',
    participant: mockUsers[2],
    lastMessage: 'The deploy went through, all green ✓',
    lastMessageAt: '2026-04-23T11:48:00Z',
    unreadCount: 5,
    isTyping: false,
    isArchived: false,
  },
  {
    id: 'conv-4',
    participant: mockUsers[3],
    lastMessage: 'Thanks for the feedback on the PR',
    lastMessageAt: '2026-04-22T18:05:00Z',
    unreadCount: 0,
    isTyping: false,
    isArchived: false,
  },
  {
    id: 'conv-5',
    participant: mockUsers[4],
    lastMessage: 'Let me know when you are available',
    lastMessageAt: '2026-04-22T09:30:00Z',
    unreadCount: 1,
    isTyping: false,
    isArchived: false,
  },
]
