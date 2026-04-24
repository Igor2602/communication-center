<script setup lang="ts">
import type { Message, Attachment } from '@/types/chat'
import Avatar from 'primevue/avatar'

const props = defineProps<{
  message: Message
  senderName: string
  senderAvatar: string
}>()

const emit = defineEmits<{
  previewAttachment: [attachment: Attachment]
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
        <button
          v-if="props.message.attachment"
          type="button"
          class="message-bubble__attachment"
          :aria-label="`Visualizar ${props.message.attachment.name}`"
          @click="emit('previewAttachment', props.message.attachment!)"
        >
          <img
            v-if="props.message.attachment.type === 'image'"
            :src="props.message.attachment.base64"
            :alt="props.message.attachment.name"
            class="message-bubble__attachment-image"
          />
          <div
            v-else-if="props.message.attachment.type === 'pdf'"
            class="message-bubble__attachment-pdf"
          >
            <i class="pi pi-file-pdf" />
            <span class="message-bubble__attachment-name">
              {{ props.message.attachment.name }}
            </span>
          </div>
        </button>
        <p v-if="props.message.content" class="message-bubble__content">
          {{ props.message.content }}
        </p>
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

    .message-bubble__attachment-pdf {
      color: $color-text-inverse;
      border-color: rgba($color-text-inverse, 0.2);
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

  &__attachment {
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: $spacing-xs;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__attachment-image {
    max-width: 240px;
    max-height: 180px;
    border-radius: $radius-md;
    object-fit: cover;
    @include transition(opacity);

    &:hover {
      opacity: 0.85;
    }
  }

  &__attachment-pdf {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    @include transition(background-color);

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    i {
      font-size: $font-size-2xl;
      color: $color-error;
      flex-shrink: 0;
    }
  }

  &__attachment-name {
    font-size: $font-size-sm;
    @include truncate;
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
