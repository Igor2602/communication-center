<script setup lang="ts">
import type { Message } from '@/types/chat'
import Avatar from 'primevue/avatar'

const props = defineProps<{
  message: Message
  senderName: string
  senderAvatar: string
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
    <Avatar
      v-if="!props.message.isOutgoing"
      :image="props.senderAvatar"
      :alt="props.senderName"
      shape="circle"
      class="message-bubble__avatar"
    />

    <div class="message-bubble__wrapper">
      <span class="message-bubble__sender">{{ props.senderName }}</span>
      <div class="message-bubble__body">
        <p class="message-bubble__content">{{ props.message.content }}</p>
      </div>
      <time
        class="message-bubble__time"
        :datetime="props.message.timestamp"
      >
        {{ formatTime(props.message.timestamp) }}
      </time>
    </div>

    <Avatar
      v-if="props.message.isOutgoing"
      :image="props.senderAvatar"
      :alt="props.senderName"
      shape="circle"
      class="message-bubble__avatar"
    />
  </div>
</template>

<style scoped lang="scss">
$color-bubble-incoming: #fdf6e3;
$color-bubble-outgoing: #1e293b;

.message-bubble {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  animation: message-enter 250ms ease both;

  &--outgoing {
    flex-direction: row-reverse;

    .message-bubble__wrapper {
      align-items: flex-end;
    }

    .message-bubble__body {
      background-color: $color-bubble-outgoing;
      color: $color-text-inverse;
      border-radius: $radius-lg $radius-lg $radius-sm $radius-lg;
    }

    .message-bubble__time {
      text-align: right;
    }
  }

  &__avatar {
    flex-shrink: 0;
    margin-top: $spacing-xs;
  }

  &__wrapper {
    @include flex-column;
    max-width: 65%;
    gap: $spacing-xs;
  }

  &__sender {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__body {
    padding: $spacing-sm $spacing-md;
    background-color: $color-bubble-incoming;
    border-radius: $radius-lg $radius-lg $radius-lg $radius-sm;
  }

  &__content {
    font-size: $font-size-sm;
    line-height: $line-height-base;
    word-break: break-word;
  }

  &__time {
    font-size: $font-size-xs;
    color: $color-text-secondary;
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
