<script setup lang="ts">
import { computed } from 'vue'
import type { ConversationItemProps, ConversationItemEmits } from './types'
import Avatar from 'primevue/avatar'
import { useTimeFormat } from '@/composables/useTimeFormat'

const props = defineProps<ConversationItemProps>()

defineEmits<ConversationItemEmits>()

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
  gap: $spacing-sm;
  width: 100%;
  padding: $spacing-md $spacing-md;
  text-align: left;
  @include transition(background-color);

  &:hover {
    background-color: $color-bg-hover;
  }

  &--active {
    background-color: $color-bg-hover;
  }

  &__avatar {
    width: $avatar-size-md !important;
    height: $avatar-size-md !important;
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
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    line-height: $line-height-base;
    letter-spacing: 0;
    color: $color-text-primary;
  }

  &__time {
    flex-shrink: 0;
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-regular;
    line-height: $line-height-tight;
    letter-spacing: 0;
    color: $color-text-primary;
  }

  &__bottom {
    @include flex-between;
    gap: $spacing-sm;
  }

  &__preview {
    @include truncate;
    font-family: $font-family-base;
    font-size: $font-size-xs;
    font-weight: $font-weight-regular;
    line-height: $line-height-base;
    letter-spacing: 0;
    color: $color-text-secondary;

    &--typing {
      font-style: italic;
    }
  }

  &__badge {
    @include flex-center;
    flex-shrink: 0;
    width: $badge-size;
    height: $badge-size;
    min-width: $badge-size;
    border-radius: $badge-radius;
    background-color: $color-badge-bg;
    font-family: $font-family-base;
    font-size: $badge-font-size;
    font-weight: $font-weight-bold;
    line-height: 100%;
    letter-spacing: 0;
    color: $color-badge-text;
  }
}
</style>
