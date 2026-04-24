<script setup lang="ts">
import { computed, watch, ref, nextTick } from 'vue'
import type { Attachment, Message, User } from '@/types/chat'
import MessageBubble from './MessageBubble.vue'
import DateDivider from './DateDivider.vue'
import TypingIndicator from './TypingIndicator.vue'
import { useTimeFormat } from '@/composables/useTimeFormat'

const props = defineProps<{
  messages: Message[]
  participant: User
  currentUserAvatar: string
  isTyping?: boolean
}>()

const emit = defineEmits<{
  previewAttachment: [attachment: Attachment]
}>()

const listRef = ref<HTMLElement | null>(null)
const { formatDateDivider } = useTimeFormat()

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

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) {
      listRef.value.scrollTop = listRef.value.scrollHeight
    }
  })
}

watch(
  () => [props.messages, props.messages.length, props.isTyping],
  () => scrollToBottom(),
  { flush: 'post' },
)
</script>

<template>
  <div ref="listRef" class="message-list" role="log" aria-label="Mensagens">
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
