import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '@/stores/useChatStore'
import { chatService } from '@/services/chatService'
import type { Conversation, Message } from '@/types/chat'

vi.mock('@/services/chatService', () => ({
  chatService: {
    getConversations: vi.fn(),
    getArchivedConversations: vi.fn(),
    getMessages: vi.fn(),
    sendMessage: vi.fn(),
    simulateReply: vi.fn(),
    archiveConversation: vi.fn(),
    unarchiveConversation: vi.fn(),
    getContacts: vi.fn(),
    createConversation: vi.fn(),
  },
}))

const mockConversation: Conversation = {
  id: 'conv-1',
  participant: { id: 'user-1', name: 'Carlos', avatar: 'avatar.png' },
  lastMessage: 'Hello',
  lastMessageAt: '2026-04-23T14:00:00Z',
  unreadCount: 3,
  isTyping: false,
  isArchived: false,
}

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-1',
    content: 'Hello',
    timestamp: '2026-04-23T14:00:00Z',
    isOutgoing: false,
    status: 'read',
  },
]

describe('useChatStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('fetchConversations', () => {
    it('loads conversations and sets loading state', async () => {
      vi.mocked(chatService.getConversations).mockResolvedValue([mockConversation])
      vi.mocked(chatService.getArchivedConversations).mockResolvedValue([])

      const store = useChatStore()

      expect(store.isLoadingConversations).toBe(false)

      const promise = store.fetchConversations()
      expect(store.isLoadingConversations).toBe(true)

      await promise
      expect(store.isLoadingConversations).toBe(false)
      expect(store.conversations).toHaveLength(1)
      expect(store.conversations[0].id).toBe('conv-1')
    })
  })

  describe('selectConversation', () => {
    it('sets selected conversation and fetches messages', async () => {
      vi.mocked(chatService.getMessages).mockResolvedValue(mockMessages)

      const store = useChatStore()
      store.conversations = [{ ...mockConversation }]

      await store.selectConversation('conv-1')

      expect(store.selectedConversationId).toBe('conv-1')
      expect(store.selectedConversation?.id).toBe('conv-1')
      expect(store.selectedMessages).toHaveLength(1)
      expect(chatService.getMessages).toHaveBeenCalledWith('conv-1')
    })

    it('skips fetch when messages are already cached', async () => {
      const store = useChatStore()
      store.conversations = [{ ...mockConversation }]
      store.messagesByConversation = { 'conv-1': mockMessages }

      await store.selectConversation('conv-1')

      expect(chatService.getMessages).not.toHaveBeenCalled()
      expect(store.selectedMessages).toHaveLength(1)
    })

    it('resets unread count when selecting a conversation', async () => {
      vi.mocked(chatService.getMessages).mockResolvedValue([])

      const store = useChatStore()
      store.conversations = [{ ...mockConversation, unreadCount: 5 }]

      await store.selectConversation('conv-1')

      expect(store.conversations[0].unreadCount).toBe(0)
    })
  })

  describe('sendMessage', () => {
    it('sends message and appends to conversation', async () => {
      const sentMessage: Message = {
        id: 'msg-new',
        conversationId: 'conv-1',
        senderId: 'me',
        content: 'Test message',
        timestamp: '2026-04-23T15:00:00Z',
        isOutgoing: true,
        status: 'sent',
      }

      vi.mocked(chatService.sendMessage).mockResolvedValue(sentMessage)
      vi.mocked(chatService.simulateReply).mockResolvedValue({
        ...sentMessage,
        id: 'msg-reply',
        content: 'Reply',
        isOutgoing: false,
        status: 'read',
      })

      const store = useChatStore()
      store.conversations = [{ ...mockConversation }]
      store.selectedConversationId = 'conv-1'
      store.messagesByConversation = { 'conv-1': [] }

      await store.sendMessage('Test message')

      expect(chatService.sendMessage).toHaveBeenCalledWith({
        conversationId: 'conv-1',
        content: 'Test message',
        attachment: undefined,
      })
      expect(store.messagesByConversation['conv-1']).toHaveLength(1)
      expect(store.messagesByConversation['conv-1'][0].content).toBe('Test message')
      expect(store.conversations[0].lastMessage).toBe('Test message')
    })

    it('does not send empty messages', async () => {
      const store = useChatStore()
      store.selectedConversationId = 'conv-1'

      await store.sendMessage('   ')

      expect(chatService.sendMessage).not.toHaveBeenCalled()
    })

    it('does not send when no conversation is selected', async () => {
      const store = useChatStore()

      await store.sendMessage('Hello')

      expect(chatService.sendMessage).not.toHaveBeenCalled()
    })
  })

  describe('archiveConversation', () => {
    it('moves conversation from active to archived', async () => {
      vi.mocked(chatService.archiveConversation).mockResolvedValue()

      const store = useChatStore()
      store.conversations = [{ ...mockConversation }]
      store.archivedConversations = []

      await store.archiveConversation('conv-1')

      expect(store.conversations).toHaveLength(0)
      expect(store.archivedConversations).toHaveLength(1)
      expect(store.archivedConversations[0].isArchived).toBe(true)
    })

    it('clears selection if archived conversation was selected', async () => {
      vi.mocked(chatService.archiveConversation).mockResolvedValue()

      const store = useChatStore()
      store.conversations = [{ ...mockConversation }]
      store.selectedConversationId = 'conv-1'

      await store.archiveConversation('conv-1')

      expect(store.selectedConversationId).toBeNull()
    })
  })
})
