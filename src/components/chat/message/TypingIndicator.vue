<script setup lang="ts">
import type { TypingIndicatorProps } from './types'
import Avatar from 'primevue/avatar'

defineProps<TypingIndicatorProps>()
</script>

<template>
  <div
    class="typing-indicator"
    aria-live="polite"
  >
    <div class="typing-indicator__header">
      <Avatar
        :image="avatar"
        :alt="name"
        shape="circle"
        class="typing-indicator__avatar"
      />
      <span class="typing-indicator__name">{{ name }}</span>
    </div>

    <div class="typing-indicator__bubble">
      <em class="typing-indicator__text">Digitando...</em>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typing-indicator {
  @include flex-column;
  align-items: flex-start;
  margin-bottom: $spacing-lg;
  animation: typing-fade-in 200ms ease both;

  &__header {
    display: flex;
    align-items: center;
    gap: $avatar-gap;
    margin-bottom: $spacing-xs;
  }

  &__avatar {
    width: $avatar-size-sm !important;
    height: $avatar-size-sm !important;
    flex-shrink: 0;
  }

  &__name {
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    line-height: $line-height-base;
    letter-spacing: 0;
    color: $color-text-primary;
  }

  &__bubble {
    padding: $spacing-sm $spacing-md;
    background-color: $color-message-incoming-bg;
    border: 1px solid $color-border;
    border-radius: $message-bubble-radius;
    box-shadow: $message-shadow;
    margin-left: $message-bubble-indent;
  }

  &__text {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-message-text;
  }
}
</style>
