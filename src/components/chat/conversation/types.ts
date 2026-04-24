import type { Conversation, User } from '@/types/chat'

export interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
}

export interface ConversationItemEmits {
  select: [conversationId: string]
}

export interface ContactListEmits {
  select: [contact: User]
  back: []
}
