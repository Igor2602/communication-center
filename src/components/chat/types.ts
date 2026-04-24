import type { Conversation } from '@/types/chat'

export interface ChatHeaderProps {
  conversation: Conversation
  showBack?: boolean
}

export interface ChatHeaderEmits {
  archive: [conversationId: string]
  unarchive: [conversationId: string]
  back: []
}
