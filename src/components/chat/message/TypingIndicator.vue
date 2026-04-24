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
    <Avatar
      :image="avatar"
      :alt="name"
      shape="circle"
      class="typing-indicator__avatar"
    />

    <div class="typing-indicator__wrapper">
      <span class="typing-indicator__name">{{ name }}</span>
      <div class="typing-indicator__bubble">
        <em class="typing-indicator__text">Digitando...</em>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$color-bubble-incoming: #fdf6e3;

.typing-indicator {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  animation: typing-fade-in 200ms ease both;

  &__avatar {
    flex-shrink: 0;
    margin-top: $spacing-xs;
  }

  &__wrapper {
    @include flex-column;
    gap: $spacing-xs;
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__bubble {
    padding: $spacing-sm $spacing-md;
    background-color: $color-bubble-incoming;
    border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
  }

  &__text {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}
</style>
