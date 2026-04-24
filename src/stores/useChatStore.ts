import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Conversation, Message, User } from '@/types/chat'
import { chatService } from '@/services/chatService'

const TYPING_DELAY_MS = 1500
const REPLY_DELAY_MS = 3000

export const useChatStore = defineStore('chat', () => {
  // State
  const conversations = ref<Conversation[]>([])
  const archivedConversations = ref<Conversation[]>([])
  const selectedConversationId = ref<string | null>(null)
  const messagesByConversation = ref<Record<string, Message[]>>({})
  const isLoadingConversations = ref(false)
  const isLoadingMessages = ref(false)
  const isSendingMessage = ref(false)
  const isViewingArchived = ref(false)

  // Getters
  const displayedConversations = computed(() =>
    isViewingArchived.value ? archivedConversations.value : conversations.value,
  )

  const selectedConversation = computed(() => {
    const allConversations = [...conversations.value, ...archivedConversations.value]
    return allConversations.find((c) => c.id === selectedConversationId.value) ?? null
  })

  const selectedMessages = computed(() => {
    if (!selectedConversationId.value) return []
    return messagesByConversation.value[selectedConversationId.value] ?? []
  })

  const isSelectedTyping = computed(() => selectedConversation.value?.isTyping ?? false)

  const isSelectedArchived = computed(() => selectedConversation.value?.isArchived ?? false)

  const archivedCount = computed(() => archivedConversations.value.length)

  // Actions
  async function fetchConversations() {
    isLoadingConversations.value = true
    try {
      conversations.value = await chatService.getConversations()
      archivedConversations.value = await chatService.getArchivedConversations()
    } finally {
      isLoadingConversations.value = false
    }
  }

  function setViewingArchived(value: boolean) {
    isViewingArchived.value = value
    selectedConversationId.value = null
  }

  async function selectConversation(conversationId: string) {
    selectedConversationId.value = conversationId

    const conversation = [...conversations.value, ...archivedConversations.value]
      .find((c) => c.id === conversationId)
    if (conversation && !conversation.isArchived) {
      conversation.unreadCount = 0
    }

    await fetchMessages(conversationId)
  }

  async function fetchMessages(conversationId: string) {
    isLoadingMessages.value = true
    try {
      const messages = await chatService.getMessages(conversationId)
      messagesByConversation.value[conversationId] = messages
    } finally {
      isLoadingMessages.value = false
    }
  }

  async function sendMessage(content: string) {
    if (!selectedConversationId.value || !content.trim()) return

    const conversationId = selectedConversationId.value

    isSendingMessage.value = true
    try {
      const message = await chatService.sendMessage({
        conversationId,
        content: content.trim(),
      })

      const messages = messagesByConversation.value[message.conversationId]
      if (messages) {
        messages.push(message)
      } else {
        messagesByConversation.value[message.conversationId] = [message]
      }

      const conversation = conversations.value.find((c) => c.id === message.conversationId)
      if (conversation) {
        conversation.lastMessage = message.content
        conversation.lastMessageAt = message.timestamp
      }
    } finally {
      isSendingMessage.value = false
    }

    simulateReply(conversationId)
  }

  function simulateReply(conversationId: string) {
    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (!conversation) return

    // Show typing after a short delay
    setTimeout(() => {
      conversation.isTyping = true

      // Send the reply after typing for a while
      setTimeout(async () => {
        conversation.isTyping = false

        const reply = await chatService.simulateReply(conversationId)

        const messages = messagesByConversation.value[conversationId]
        if (messages) {
          messages.push(reply)
        }

        conversation.lastMessage = reply.content
        conversation.lastMessageAt = reply.timestamp
      }, REPLY_DELAY_MS)
    }, TYPING_DELAY_MS)
  }

  async function startConversation(contact: User) {
    // Check active conversations
    const existing = conversations.value.find(
      (c) => c.participant.id === contact.id,
    )
    if (existing) {
      isViewingArchived.value = false
      await selectConversation(existing.id)
      return
    }

    // Check archived conversations — unarchive if found
    const archived = archivedConversations.value.find(
      (c) => c.participant.id === contact.id,
    )
    if (archived) {
      await unarchiveConversation(archived.id)
      isViewingArchived.value = false
      await selectConversation(archived.id)
      return
    }

    // Create new conversation
    const conversation = await chatService.createConversation(contact)
    conversations.value.unshift(conversation)
    messagesByConversation.value[conversation.id] = []
    isViewingArchived.value = false
    selectedConversationId.value = conversation.id
  }

  function setTyping(conversationId: string, isTyping: boolean) {
    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isTyping = isTyping
    }
  }

  async function archiveConversation(conversationId: string) {
    await chatService.archiveConversation(conversationId)

    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = true
      conversations.value = conversations.value.filter((c) => c.id !== conversationId)
      archivedConversations.value.push(conversation)
    }

    if (selectedConversationId.value === conversationId) {
      selectedConversationId.value = null
    }
  }

  async function unarchiveConversation(conversationId: string) {
    await chatService.unarchiveConversation(conversationId)

    const conversation = archivedConversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = false
      archivedConversations.value = archivedConversations.value.filter((c) => c.id !== conversationId)
      conversations.value.push(conversation)
    }

    if (selectedConversationId.value === conversationId) {
      selectedConversationId.value = null
    }
  }

  return {
    // State
    conversations,
    archivedConversations,
    selectedConversationId,
    messagesByConversation,
    isLoadingConversations,
    isLoadingMessages,
    isSendingMessage,
    isViewingArchived,

    // Getters
    displayedConversations,
    selectedConversation,
    selectedMessages,
    isSelectedTyping,
    isSelectedArchived,
    archivedCount,

    // Actions
    fetchConversations,
    setViewingArchived,
    selectConversation,
    fetchMessages,
    sendMessage,
    setTyping,
    startConversation,
    archiveConversation,
    unarchiveConversation,
  }
})
