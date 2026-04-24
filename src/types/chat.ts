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
  /** ISO 8601 timestamp */
  timestamp: string
  isOutgoing: boolean
  attachment?: Attachment
}

export interface Conversation {
  id: string
  participant: User
  /** Plain text preview of the last message in the conversation */
  lastMessage: string
  /** ISO 8601 timestamp of the last message */
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
