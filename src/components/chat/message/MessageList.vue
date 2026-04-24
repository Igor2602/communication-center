<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import type { Message } from '@/types/chat'
import type { MessageListProps, MessageListEmits } from './types'
import MessageBubble from './MessageBubble.vue'
import DateDivider from './DateDivider.vue'
import TypingIndicator from './TypingIndicator.vue'
import { useTimeFormat } from '@/composables/useTimeFormat'
import { useAutoScroll } from '@/composables/useAutoScroll'

const props = defineProps<MessageListProps>()

const emit = defineEmits<MessageListEmits>()

const listRef = ref<HTMLElement | null>(null)
const { formatDateDivider } = useTimeFormat()
const { scrollToBottom } = useAutoScroll(listRef)

interface DateGroup {
  date: string
  label: string
  messages: Message[]
}

const groupedMessages = computed<DateGroup[]>(() => {
  const groups: DateGroup[] = []

  for (const message of props.messages) {
    const dateKey = message.timestamp.slice(0, 10)

    if (groups.length === 0 || groups[groups.length - 1].date !== dateKey) {
      groups.push({
        date: dateKey,
        label: formatDateDivider(dateKey),
        messages: [message],
      })
    } else {
      groups[groups.length - 1].messages.push(message)
    }
  }

  return groups
})

function getSenderName(message: Message): string {
  return message.isOutgoing ? 'Você' : props.participant.name
}

function getSenderAvatar(message: Message): string {
  return message.isOutgoing ? props.currentUserAvatar : props.participant.avatar
}

// Force scroll on conversation change (instant)
watch(() => props.messages, () => scrollToBottom(true), { flush: 'post' })

// Force scroll on new messages (smooth)
watch(() => props.messages.length, () => scrollToBottom(true), { flush: 'post' })

// Respect user position for typing indicator only
watch(() => props.isTyping, () => scrollToBottom(), { flush: 'post' })
</script>

<template>
  <div
    ref="listRef"
    class="message-list"
    role="log"
    aria-label="Mensagens"
  >
    <div
      class="message-list__banner"
      role="status"
    >
      Todas as conversas podem ser visualizadas pelo gestor do sistema para fins de auditoria institucional.
    </div>

    <template
      v-for="group in groupedMessages"
      :key="group.date"
    >
      <DateDivider :label="group.label" />
      <MessageBubble
        v-for="message in group.messages"
        :key="message.id"
        :message="message"
        :sender-name="getSenderName(message)"
        :sender-avatar="getSenderAvatar(message)"
        @preview-attachment="emit('previewAttachment', $event)"
      />
    </template>

    <TypingIndicator
      v-if="isTyping"
      :name="participant.name"
      :avatar="participant.avatar"
    />
  </div>
</template>

<style scoped lang="scss">
.message-list {
  @include flex-column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding: $spacing-md $spacing-lg;
  @include custom-scrollbar;

  &__banner {
    align-self: center;
    padding: 7px 10.5px;
    margin-bottom: $spacing-md;
    gap: 7px;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: #ca8a04;
    background-color: #fefce8f2;
    box-shadow: 0 4px 8px 0 rgba(9, 7, 0, 0.04);
    border-radius: $radius-md;
    white-space: nowrap;
  }

  // Reset children to full width
  & > *:not(.message-list__banner) {
    align-self: stretch;
  }
}
</style>
