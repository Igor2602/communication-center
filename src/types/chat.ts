export interface User {
  id: string
  name: string
  avatar: string
}

export interface Attachment {
  name: string
  type: 'image' | 'pdf'
  base64: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  isOutgoing: boolean
  attachment?: Attachment
}

export interface Conversation {
  id: string
  participant: User
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  isTyping: boolean
  isArchived: boolean
}

export interface SendMessagePayload {
  conversationId: string
  content: string
  attachment?: Attachment
}
