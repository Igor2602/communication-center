import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageBubble from '@/components/chat/message/MessageBubble.vue'
import type { Message } from '@/types/chat'

const baseMessage: Message = {
  id: 'msg-1',
  conversationId: 'conv-1',
  senderId: 'user-1',
  content: 'Olá, tudo bem?',
  timestamp: '2026-04-23T14:30:00Z',
  isOutgoing: false,
}

function createWrapper(message: Message) {
  return mount(MessageBubble, {
    props: {
      message,
      senderName: message.isOutgoing ? 'Você' : 'Carlos',
      senderAvatar: 'avatar.png',
    },
    global: {
      stubs: {
        Avatar: {
          template: '<div class="avatar-stub" :data-alt="alt"></div>',
          props: ['image', 'alt', 'shape'],
        },
      },
    },
  })
}

describe('MessageBubble', () => {
  it('renders message content', () => {
    const wrapper = createWrapper(baseMessage)

    expect(wrapper.text()).toContain('Olá, tudo bem?')
  })

  it('renders sender name', () => {
    const wrapper = createWrapper(baseMessage)

    expect(wrapper.text()).toContain('Carlos')
  })

  it('renders timestamp', () => {
    const wrapper = createWrapper(baseMessage)

    expect(wrapper.find('.message-bubble__time').exists()).toBe(true)
  })

  it('applies outgoing class for outgoing messages', () => {
    const outgoing = { ...baseMessage, isOutgoing: true }
    const wrapper = createWrapper(outgoing)

    expect(wrapper.find('.message-bubble--outgoing').exists()).toBe(true)
  })

  it('does not apply outgoing class for incoming messages', () => {
    const wrapper = createWrapper(baseMessage)

    expect(wrapper.find('.message-bubble--outgoing').exists()).toBe(false)
  })

  it('renders avatar for incoming messages', () => {
    const wrapper = createWrapper(baseMessage)
    const avatars = wrapper.findAll('.avatar-stub')

    expect(avatars.length).toBe(1)
  })

  it('renders avatar for outgoing messages', () => {
    const outgoing = { ...baseMessage, isOutgoing: true }
    const wrapper = createWrapper(outgoing)
    const avatars = wrapper.findAll('.avatar-stub')

    expect(avatars.length).toBe(1)
  })

  it('renders attachment button when message has attachment', () => {
    const withAttachment: Message = {
      ...baseMessage,
      attachment: { name: 'photo.png', type: 'image', base64: 'data:image/png;base64,abc' },
    }
    const wrapper = createWrapper(withAttachment)

    expect(wrapper.find('.message-bubble__attachment').exists()).toBe(true)
  })

  it('emits previewAttachment on attachment click', async () => {
    const attachment = { name: 'doc.pdf', type: 'pdf' as const, base64: 'data:application/pdf;base64,abc' }
    const withAttachment: Message = { ...baseMessage, attachment }
    const wrapper = createWrapper(withAttachment)

    await wrapper.find('.message-bubble__attachment').trigger('click')

    expect(wrapper.emitted('previewAttachment')).toBeTruthy()
    expect(wrapper.emitted('previewAttachment')![0]).toEqual([attachment])
  })
})
