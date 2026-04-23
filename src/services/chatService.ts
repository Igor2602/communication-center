import type { Conversation, Message, SendMessagePayload } from '@/types/chat'
import { mockConversations } from '@/mocks/conversations'
import { mockMessages } from '@/mocks/messages'

const SIMULATED_DELAY_MS = 400

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY_MS))
}

let nextMessageId = 100

export const chatService = {
  getConversations(): Promise<Conversation[]> {
    const active = mockConversations.filter((c) => !c.isArchived)
    return delay([...active])
  },

  getMessages(conversationId: string): Promise<Message[]> {
    const messages = mockMessages[conversationId] ?? []
    return delay([...messages])
  },

  sendMessage(payload: SendMessagePayload): Promise<Message> {
    const message: Message = {
      id: `msg-new-${++nextMessageId}`,
      conversationId: payload.conversationId,
      senderId: 'user-me',
      content: payload.content,
      timestamp: new Date().toISOString(),
      isOutgoing: true,
    }

    const conversationMessages = mockMessages[payload.conversationId]
    if (conversationMessages) {
      conversationMessages.push(message)
    }

    const conversation = mockConversations.find((c) => c.id === payload.conversationId)
    if (conversation) {
      conversation.lastMessage = payload.content
      conversation.lastMessageAt = message.timestamp
    }

    return delay(message)
  },

  archiveConversation(conversationId: string): Promise<void> {
    const conversation = mockConversations.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = true
    }
    return delay(undefined)
  },
}
