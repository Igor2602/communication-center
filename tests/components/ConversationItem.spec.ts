import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConversationItem from '@/components/chat/ConversationItem.vue'
import type { Conversation } from '@/types/chat'

const mockConversation: Conversation = {
  id: 'conv-1',
  participant: {
    id: 'user-1',
    name: 'Carlos Mendes',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
  },
  lastMessage: 'Estou revisando agora',
  lastMessageAt: '2026-04-23T14:50:00Z',
  unreadCount: 3,
  isTyping: false,
  isArchived: false,
}

function createWrapper(props: { conversation: Conversation; isActive: boolean }) {
  return mount(ConversationItem, {
    props,
    global: {
      stubs: {
        Avatar: {
          template: '<div class="avatar-stub" :data-alt="alt"></div>',
          props: ['image', 'alt', 'shape', 'size'],
        },
        Badge: {
          template: '<span class="badge-stub">{{ value }}</span>',
          props: ['value', 'severity'],
        },
      },
    },
  })
}

describe('ConversationItem', () => {
  it('renders participant name', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: false })

    expect(wrapper.text()).toContain('Carlos Mendes')
  })

  it('renders last message preview with first name prefix', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: false })

    expect(wrapper.text()).toContain('Carlos: Estou revisando agora')
  })

  it('renders unread badge when count is greater than zero', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: false })

    const badge = wrapper.find('.badge-stub')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('3')
  })

  it('does not render badge when unread count is zero', () => {
    const conversation = { ...mockConversation, unreadCount: 0 }
    const wrapper = createWrapper({ conversation, isActive: false })

    expect(wrapper.find('.badge-stub').exists()).toBe(false)
  })

  it('applies active class when isActive is true', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: true })

    expect(wrapper.find('.conversation-item--active').exists()).toBe(true)
  })

  it('does not apply active class when isActive is false', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: false })

    expect(wrapper.find('.conversation-item--active').exists()).toBe(false)
  })

  it('sets correct aria-selected based on active state', () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: true })
    const button = wrapper.find('button')

    expect(button.attributes('aria-selected')).toBe('true')
  })

  it('emits select event with conversation id on click', async () => {
    const wrapper = createWrapper({ conversation: mockConversation, isActive: false })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual(['conv-1'])
  })

  it('shows typing state in preview', () => {
    const conversation = { ...mockConversation, isTyping: true }
    const wrapper = createWrapper({ conversation, isActive: false })

    expect(wrapper.text()).toContain('Carlos: Digitando...')
    expect(wrapper.find('.conversation-item__preview--typing').exists()).toBe(true)
  })
})
