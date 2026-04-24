import type { Conversation, Message, SendMessagePayload, User } from '@/types/chat'
import { mockConversations } from '@/mocks/conversations'
import { mockMessages } from '@/mocks/messages'
import { currentUser, mockUsers } from '@/mocks/users'

const SIMULATED_DELAY_MS = 400

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY_MS))
}

function generateId(): string {
  return crypto.randomUUID()
}

const autoReplies = [
  'Entendi, vou verificar aqui e te retorno!',
  'Boa, obrigado por avisar!',
  'Perfeito, pode deixar comigo.',
  'Combinado! Qualquer coisa me chama.',
  'Vou dar uma olhada e já te falo.',
  'Ótimo, vamos seguir assim então.',
  'Recebi! Vou analisar com calma.',
  'Show, depois a gente alinha os detalhes.',
  'Beleza, estou de acordo!',
  'Ok, vou encaminhar para o time.',
]

function getRandomReply(): string {
  return autoReplies[Math.floor(Math.random() * autoReplies.length)]
}

export const chatService = {
  getConversations(): Promise<Conversation[]> {
    const active = mockConversations.filter((c) => !c.isArchived)
    return delay([...active])
  },

  getArchivedConversations(): Promise<Conversation[]> {
    const archived = mockConversations.filter((c) => c.isArchived)
    return delay([...archived])
  },

  getMessages(conversationId: string): Promise<Message[]> {
    const messages = mockMessages[conversationId] ?? []
    return delay([...messages])
  },

  sendMessage(payload: SendMessagePayload): Promise<Message> {
    const message: Message = {
      id: generateId(),
      conversationId: payload.conversationId,
      senderId: currentUser.id,
      content: payload.content,
      timestamp: new Date().toISOString(),
      isOutgoing: true,
      attachment: payload.attachment,
    }

    return delay(message)
  },

  simulateReply(conversationId: string): Promise<Message> {
    const content = getRandomReply()
    const conversation = mockConversations.find((c) => c.id === conversationId)
    const senderId = conversation?.participant.id ?? 'unknown'

    const reply: Message = {
      id: generateId(),
      conversationId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      isOutgoing: false,
    }

    return delay(reply)
  },

  getContacts(): Promise<User[]> {
    return delay([...mockUsers])
  },

  createConversation(participant: User): Promise<Conversation> {
    const conversation: Conversation = {
      id: generateId(),
      participant,
      lastMessage: '',
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      isTyping: false,
      isArchived: false,
    }

    return delay(conversation)
  },

  archiveConversation(_conversationId: string): Promise<void> {
    return delay(undefined)
  },

  unarchiveConversation(_conversationId: string): Promise<void> {
    return delay(undefined)
  },
}
