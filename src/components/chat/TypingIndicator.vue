<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="typing-indicator" aria-live="polite">
    <div class="typing-indicator__dots">
      <span class="typing-indicator__dot" />
      <span class="typing-indicator__dot" />
      <span class="typing-indicator__dot" />
    </div>
    <span class="typing-indicator__label">{{ name }} está digitando</span>
  </div>
</template>

<style scoped lang="scss">
.typing-indicator {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-xs 0;
  animation: typing-fade-in 200ms ease both;

  &__dots {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: $spacing-sm $spacing-md;
    background-color: $color-bg-primary;
    border: 1px solid $color-border;
    border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: $radius-full;
    background-color: $color-text-secondary;
    animation: typing-bounce 1.2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }

  &__label {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    font-style: italic;
  }
}

@keyframes typing-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@keyframes typing-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
