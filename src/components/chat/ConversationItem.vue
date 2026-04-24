<script setup lang="ts">
import { computed } from 'vue'
import type { Conversation } from '@/types/chat'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
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
      size="large"
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
        <Badge
          v-if="props.conversation.unreadCount > 0"
          :value="props.conversation.unreadCount"
          severity="info"
          class="conversation-item__badge"
        />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.conversation-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  width: 100%;
  padding: $spacing-md $spacing-lg;
  text-align: left;
  @include transition(background-color);

  &:hover {
    background-color: $color-bg-tertiary;
  }

  &--active {
    background-color: $color-bg-tertiary;
  }

  &__content {
    @include flex-column;
    flex: 1;
    min-width: 0;
    gap: $spacing-xs;
  }

  &__top {
    @include flex-between;
    gap: $spacing-sm;
  }

  &__name {
    @include truncate;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__time {
    flex-shrink: 0;
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__bottom {
    @include flex-between;
    gap: $spacing-sm;
  }

  &__preview {
    @include truncate;
    font-size: $font-size-sm;
    color: $color-text-secondary;

    &--typing {
      font-style: italic;
    }
  }

  &__badge {
    flex-shrink: 0;
  }
}
</style>
