import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Attachment, Conversation, Message, User } from '@/types/chat'
import { chatService } from '@/services/chatService'

const TYPING_DELAY_MS = 1500
const REPLY_DELAY_MS = 3000

export const useChatStore = defineStore('chat', () => {
  // State
  const conversations = ref<Conversation[]>([])
  const archivedConversations = ref<Conversation[]>([])
  const contacts = ref<User[]>([])
  const selectedConversationId = ref<string | null>(null)
  const messagesByConversation = ref<Record<string, Message[]>>({})
  const isLoadingConversations = ref(false)
  const isLoadingMessages = ref(false)
  const isSendingMessage = ref(false)
  const isViewingArchived = ref(false)

  // Getters
  const displayedConversations = computed(() => {
    const list = isViewingArchived.value ? archivedConversations.value : conversations.value
    return [...list].sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))
  })

  const selectedConversation = computed(() => {
    const allConversations = [...conversations.value, ...archivedConversations.value]
    return allConversations.find((c) => c.id === selectedConversationId.value) ?? null
  })

  const selectedMessages = computed(() => {
    if (!selectedConversationId.value) return []
    return messagesByConversation.value[selectedConversationId.value] ?? []
  })

  const isSelectedTyping = computed(() => selectedConversation.value?.isTyping ?? false)

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

  async function fetchContacts() {
    contacts.value = await chatService.getContacts()
  }

  function insertSorted(list: Conversation[], conversation: Conversation) {
    const index = list.findIndex(
      (c) => c.lastMessageAt < conversation.lastMessageAt,
    )
    if (index === -1) {
      list.push(conversation)
    } else {
      list.splice(index, 0, conversation)
    }
  }

  function clearSelection() {
    selectedConversationId.value = null
  }

  function setViewingArchived(value: boolean) {
    isViewingArchived.value = value
    clearSelection()
  }

  async function selectConversation(conversationId: string) {
    if (!conversationId) return

    selectedConversationId.value = conversationId

    const conversation = [...conversations.value, ...archivedConversations.value]
      .find((c) => c.id === conversationId)
    if (conversation && !conversation.isArchived) {
      conversation.unreadCount = 0
    }

    if (!messagesByConversation.value[conversationId]) {
      isLoadingMessages.value = true
      await fetchMessages(conversationId)
    }
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

  async function sendMessage(content: string, attachment?: Attachment) {
    if (!selectedConversationId.value) return
    if (!content.trim() && !attachment) return

    const conversationId = selectedConversationId.value

    isSendingMessage.value = true
    try {
      const message = await chatService.sendMessage({
        conversationId,
        content: content.trim(),
        attachment,
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

  function findActiveConversation(conversationId: string): Conversation | undefined {
    return conversations.value.find(
      (c) => c.id === conversationId && !c.isArchived,
    )
  }

  function simulateReply(conversationId: string) {
    setTimeout(() => {
      const conversation = findActiveConversation(conversationId)
      if (!conversation) return

      conversation.isTyping = true

      setTimeout(async () => {
        const current = findActiveConversation(conversationId)
        if (!current) return

        current.isTyping = false

        const reply = await chatService.simulateReply(conversationId)

        const messages = messagesByConversation.value[conversationId]
        if (messages) {
          messages.push(reply)
        }

        current.lastMessage = reply.content
        current.lastMessageAt = reply.timestamp
      }, REPLY_DELAY_MS)
    }, TYPING_DELAY_MS)
  }

  async function startConversation(contact: User) {
    const existing = conversations.value.find(
      (c) => c.participant.id === contact.id,
    )
    if (existing) {
      isViewingArchived.value = false
      await selectConversation(existing.id)
      return
    }

    const archived = archivedConversations.value.find(
      (c) => c.participant.id === contact.id,
    )
    if (archived) {
      await unarchiveConversation(archived.id)
      isViewingArchived.value = false
      await selectConversation(archived.id)
      return
    }

    const conversation = await chatService.createConversation(contact)
    conversations.value.unshift(conversation)
    messagesByConversation.value[conversation.id] = []
    isViewingArchived.value = false
    selectedConversationId.value = conversation.id
  }

  async function archiveConversation(conversationId: string) {
    if (!conversationId) return

    await chatService.archiveConversation(conversationId)

    const conversation = conversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = true
      conversations.value = conversations.value.filter((c) => c.id !== conversationId)
      insertSorted(archivedConversations.value, conversation)
    }

    isViewingArchived.value = true
  }

  async function unarchiveConversation(conversationId: string) {
    if (!conversationId) return

    await chatService.unarchiveConversation(conversationId)

    const conversation = archivedConversations.value.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = false
      archivedConversations.value = archivedConversations.value.filter((c) => c.id !== conversationId)
      insertSorted(conversations.value, conversation)
    }

    isViewingArchived.value = false
  }

  return {
    // State
    conversations,
    archivedConversations,
    contacts,
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
    archivedCount,

    // Actions
    fetchConversations,
    fetchContacts,
    clearSelection,
    setViewingArchived,
    selectConversation,
    fetchMessages,
    sendMessage,
    startConversation,
    archiveConversation,
    unarchiveConversation,
  }
})
