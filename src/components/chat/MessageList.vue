<script setup lang="ts">
import { computed, watch, ref, nextTick } from 'vue'
import type { Message } from '@/types/chat'
import MessageBubble from './MessageBubble.vue'
import DateDivider from './DateDivider.vue'

const props = defineProps<{
  messages: Message[]
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
  if (isToday) return 'Hoje'

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  if (isYesterday) return 'Ontem'

  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) {
      listRef.value.scrollTop = listRef.value.scrollHeight
    }
  })
}

watch(
  () => props.messages.length,
  () => scrollToBottom(),
  { flush: 'post' },
)
</script>

<template>
  <div ref="listRef" class="message-list">
    <template v-for="group in groupedMessages" :key="group.date">
      <DateDivider :label="group.label" />
      <MessageBubble
        v-for="message in group.messages"
        :key="message.id"
        :message="message"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.message-list {
  @include flex-column;
  height: 100%;
  overflow-y: auto;
  padding: $spacing-md $spacing-lg;
}
</style>
