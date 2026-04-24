import type { Attachment, Message, User } from '@/types/chat'

export interface MessageBubbleProps {
  message: Message
  senderName: string
  senderAvatar: string
}

export interface MessageBubbleEmits {
  previewAttachment: [attachment: Attachment]
}

export interface MessageListProps {
  messages: Message[]
  participant: User
  currentUserAvatar: string
  isTyping?: boolean
}

export interface MessageListEmits {
  previewAttachment: [attachment: Attachment]
}

export interface TypingIndicatorProps {
  name: string
  avatar: string
}

export interface DateDividerProps {
  label: string
}

export interface AttachmentPreviewProps {
  attachment: Attachment | null
}
