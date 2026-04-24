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
    gap: 8px;
    margin-bottom: $spacing-xs;
  }

  &__avatar {
    width: 28px !important;
    height: 28px !important;
    flex-shrink: 0;
  }

  &__name {
    font-family: $font-family-base;
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 24px;
    letter-spacing: 0;
    color: #334155;
  }

  &__bubble {
    padding: $spacing-sm $spacing-md;
    background-color: #f3f7fb;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(4, 5, 6, 0.04);
    margin-left: calc(28px + 8px);
  }

  &__text {
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-medium;
    color: #475569;
  }
}
</style>
