<script setup lang="ts">
import { computed } from 'vue'
import type { Conversation } from '@/types/chat'
import Avatar from 'primevue/avatar'
import { useTimeFormat } from '@/composables/useTimeFormat'

const props = defineProps<{
  conversation: Conversation
  isActive: boolean
}>()

defineEmits<{
  select: [conversationId: string]
}>()

const { formatConversationTime } = useTimeFormat()

const firstName = computed(() =>
  props.conversation.participant.name.split(' ')[0],
)

const previewText = computed(() => {
  if (props.conversation.isTyping) {
    return `${firstName.value}: Digitando...`
  }
  return `${firstName.value}: ${props.conversation.lastMessage}`
})
</script>

<template>
  <button
    class="conversation-item"
    :class="{ 'conversation-item--active': isActive }"
    type="button"
    role="option"
    :aria-selected="isActive"
    :aria-label="`Conversa com ${props.conversation.participant.name}`"
    @click="$emit('select', props.conversation.id)"
  >
    <Avatar
      :image="props.conversation.participant.avatar"
      :alt="props.conversation.participant.name"
      shape="circle"
      class="conversation-item__avatar"
    />

    <div class="conversation-item__content">
      <div class="conversation-item__top">
        <span class="conversation-item__name">
          {{ props.conversation.participant.name }}
        </span>
        <time
          class="conversation-item__time"
          :datetime="props.conversation.lastMessageAt"
        >
          {{ formatConversationTime(props.conversation.lastMessageAt) }}
        </time>
      </div>

      <div class="conversation-item__bottom">
        <span
          class="conversation-item__preview"
          :class="{ 'conversation-item__preview--typing': props.conversation.isTyping }"
        >
          {{ previewText }}
        </span>
        <span
          v-if="props.conversation.unreadCount > 0"
          class="conversation-item__badge"
        >
          {{ props.conversation.unreadCount }}
        </span>
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.conversation-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  @include transition(background-color);

  &:hover {
    background-color: #f3f7fb;
  }

  &--active {
    background-color: #f3f7fb;
  }

  &__avatar {
    width: 42px !important;
    height: 42px !important;
    flex-shrink: 0;
  }

  &__content {
    @include flex-column;
    flex: 1;
    min-width: 0;
    gap: 2px;
  }

  &__top {
    @include flex-between;
    gap: $spacing-sm;
  }

  &__name {
    @include truncate;
    font-family: $font-family-base;
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 24px;
    letter-spacing: 0;
    color: #334155;
  }

  &__time {
    flex-shrink: 0;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-regular;
    line-height: 20px;
    letter-spacing: 0;
    color: #334155;
  }

  &__bottom {
    @include flex-between;
    gap: $spacing-sm;
  }

  &__preview {
    @include truncate;
    font-family: $font-family-base;
    font-size: 12px;
    font-weight: $font-weight-regular;
    line-height: 18px;
    letter-spacing: 0;
    color: #64748b;

    &--typing {
      font-style: italic;
    }
  }

  &__badge {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    height: 21px;
    min-width: 21px;
    border-radius: 10.5px;
    background-color: #0768ac;
    font-family: $font-family-base;
    font-size: 11px;
    font-weight: $font-weight-bold;
    line-height: 100%;
    letter-spacing: 0;
    color: #ffffff;
  }
}
</style>
