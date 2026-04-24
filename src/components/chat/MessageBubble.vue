<script setup lang="ts">
import type { Message } from '@/types/chat'

const props = defineProps<{
  message: Message
}>()

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div
    class="message-bubble"
    :class="{ 'message-bubble--outgoing': props.message.isOutgoing }"
  >
    <div class="message-bubble__body">
      <p class="message-bubble__content">{{ props.message.content }}</p>
      <time
        class="message-bubble__time"
        :datetime="props.message.timestamp"
      >
        {{ formatTime(props.message.timestamp) }}
      </time>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-bubble {
  display: flex;
  margin-bottom: $spacing-xs;
  animation: message-enter 250ms ease both;

  &--outgoing {
    justify-content: flex-end;

    .message-bubble__body {
      background-color: $color-primary;
      color: $color-text-inverse;
      border-radius: $radius-lg $radius-lg $radius-sm $radius-lg;
    }

    .message-bubble__time {
      color: rgba($color-text-inverse, 0.7);
    }
  }

  &__body {
    max-width: 65%;
    padding: $spacing-sm $spacing-md;
    background-color: $color-bg-primary;
    border: 1px solid $color-border;
    border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
  }

  &__content {
    font-size: $font-size-sm;
    line-height: $line-height-base;
    word-break: break-word;
  }

  &__time {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    text-align: right;
  }
}

@keyframes message-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
