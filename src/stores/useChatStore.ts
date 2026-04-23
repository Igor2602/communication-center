import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Conversation, Message } from '@/types/chat'
import { chatService } from '@/services/chatService'

export const useChatStore = defineStore('chat', () => {
  // State
  const conversations = ref<Conversation[]>([])
  const selectedConversationId = ref<string | null>(null)
  const messagesByConversation = ref<Record<string, Message[]>>({})
  const isLoadingConversations = ref(false)
  const isLoadingMessages = ref(false)
  const isSendingMessage = ref(false)

  // Getters
  const selectedConversation = computed(() =>
    conversations.value.find((c) => c.id === selectedConversationId.value) ?? null,
  )

  const selectedMessages = computed(() => {
    if (!selectedConversationId.value) return []
    return messagesByConversation.value[selectedConversationId.value] ?? []
  })

  // Actions
  async function fetchConversations() {
    isLoadingConversations.value = true
    try {
      conversations.value = await chatService.getConversations()
    } finally {
      isLoadingConversations.value = false
    }
  }

  async function selectConversation(conversationId: string) {
    selectedConversationId.value = conversationId

    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (conversation) {
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

    isSendingMessage.value = true
    try {
      const message = await chatService.sendMessage({
        conversationId: selectedConversationId.value,
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
  }

  function setTyping(conversationId: string, isTyping: boolean) {
    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isTyping = isTyping
    }
  }

  async function archiveConversation(conversationId: string) {
    await chatService.archiveConversation(conversationId)
    conversations.value = conversations.value.filter((c) => c.id !== conversationId)

    if (selectedConversationId.value === conversationId) {
      selectedConversationId.value = null
    }
  }

  return {
    // State
    conversations,
    selectedConversationId,
    messagesByConversation,
    isLoadingConversations,
    isLoadingMessages,
    isSendingMessage,

    // Getters
    selectedConversation,
    selectedMessages,

    // Actions
    fetchConversations,
    selectConversation,
    fetchMessages,
    sendMessage,
    setTyping,
    archiveConversation,
  }
})
