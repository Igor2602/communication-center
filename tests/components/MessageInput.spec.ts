import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MessageInput from '@/components/chat/MessageInput.vue'
import { useChatStore } from '@/stores/useChatStore'

vi.mock('@/services/chatService', () => ({
  chatService: {
    getConversations: vi.fn().mockResolvedValue([]),
    getArchivedConversations: vi.fn().mockResolvedValue([]),
    getMessages: vi.fn().mockResolvedValue([]),
    sendMessage: vi.fn().mockResolvedValue({
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'me',
      content: 'test',
      timestamp: new Date().toISOString(),
      isOutgoing: true,
      status: 'sent',
    }),
    simulateReply: vi.fn().mockResolvedValue({
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'reply',
      timestamp: new Date().toISOString(),
      isOutgoing: false,
      status: 'read',
    }),
  },
}))

function createWrapper() {
  return mount(MessageInput, {
    global: {
      plugins: [createPinia()],
      stubs: {
        Button: {
          template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
          props: ['disabled', 'icon', 'label', 'aria-label'],
        },
      },
    },
  })
}

describe('MessageInput', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders textarea with correct placeholder', () => {
    const wrapper = createWrapper()
    const textarea = wrapper.find('textarea')

    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Escreva uma mensagem')
  })

  it('sends message on Enter key', async () => {
    const wrapper = createWrapper()
    const store = useChatStore()
    store.selectedConversationId = 'conv-1'
    store.messagesByConversation = { 'conv-1': [] }
    store.conversations = [{
      id: 'conv-1',
      participant: { id: 'user-1', name: 'Test', avatar: '' },
      lastMessage: '',
      lastMessageAt: '',
      unreadCount: 0,
      isTyping: false,
      isArchived: false,
    }]

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello world')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: false })

    expect(textarea.element.value).toBe('')
  })

  it('inserts new line on Shift + Enter', async () => {
    const wrapper = createWrapper()
    const textarea = wrapper.find('textarea')

    await textarea.setValue('Line 1')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: true })

    // Shift+Enter should NOT clear the textarea (no send)
    expect(textarea.element.value).toBe('Line 1')
  })

  it('prevents empty submission', async () => {
    const wrapper = createWrapper()
    const store = useChatStore()
    store.selectedConversationId = 'conv-1'
    const sendSpy = vi.spyOn(store, 'sendMessage')

    const textarea = wrapper.find('textarea')
    await textarea.setValue('   ')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: false })

    expect(sendSpy).not.toHaveBeenCalled()
  })

  it('displays character counter', async () => {
    const wrapper = createWrapper()
    const textarea = wrapper.find('textarea')

    await textarea.setValue('Hello')

    expect(wrapper.text()).toContain('5/2000 caracteres')
  })
})
