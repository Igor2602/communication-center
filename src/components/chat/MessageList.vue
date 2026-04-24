<script setup lang="ts">
import { computed, watch, ref, nextTick } from 'vue'
import type { Message, User } from '@/types/chat'
import MessageBubble from './MessageBubble.vue'
import DateDivider from './DateDivider.vue'
import TypingIndicator from './TypingIndicator.vue'

const props = defineProps<{
  messages: Message[]
  participant: User
  currentUserAvatar: string
  isTyping?: boolean
}>()

const listRef = ref<HTMLElement | null>(null)

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
        label: formatDateLabel(dateKey),
        messages: [message],
      })
    } else {
      groups[groups.length - 1].messages.push(message)
    }
  }

  return groups
})

function formatDateLabel(dateKey: string): string {
  const date = new Date(dateKey + 'T12:00:00')
  const now = new Date()

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  if (isToday) {
    return `Hoje, ${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}`
  }

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  if (isYesterday) {
    return `Ontem, ${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}`
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getSenderName(message: Message): string {
  return message.isOutgoing ? 'Você' : props.participant.name
}

function getSenderAvatar(message: Message): string {
  return message.isOutgoing ? props.currentUserAvatar : props.participant.avatar
}

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) {
      listRef.value.scrollTop = listRef.value.scrollHeight
    }
  })
}

watch(
  () => [props.messages.length, props.isTyping],
  () => scrollToBottom(),
  { flush: 'post' },
)
</script>

<template>
  <div ref="listRef" class="message-list">
    <div class="message-list__banner" role="status">
      Todas as conversas podem ser visualizadas pelo gestor do sistema para fins de auditoria institucional.
    </div>

    <template v-for="group in groupedMessages" :key="group.date">
      <DateDivider :label="group.label" />
      <MessageBubble
        v-for="message in group.messages"
        :key="message.id"
        :message="message"
        :sender-name="getSenderName(message)"
        :sender-avatar="getSenderAvatar(message)"
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
$color-banner-bg: #fef3cd;
$color-banner-text: #856404;
$color-banner-border: #ffeeba;

.message-list {
  @include flex-column;
  height: 100%;
  overflow-y: auto;
  padding: $spacing-md $spacing-lg;

  &__banner {
    text-align: center;
    padding: $spacing-sm $spacing-md;
    margin-bottom: $spacing-md;
    font-size: $font-size-sm;
    color: $color-banner-text;
    background-color: $color-banner-bg;
    border: 1px solid $color-banner-border;
    border-radius: $radius-md;
  }
}
</style>
