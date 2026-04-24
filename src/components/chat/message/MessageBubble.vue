<script setup lang="ts">
import type { MessageBubbleProps, MessageBubbleEmits } from './types'
import Avatar from 'primevue/avatar'

const props = defineProps<MessageBubbleProps>()

const emit = defineEmits<MessageBubbleEmits>()

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
    <div class="message-bubble__header">
      <template v-if="props.message.isOutgoing">
        <span class="message-bubble__sender">{{ props.senderName }}</span>
        <Avatar
          :image="props.senderAvatar"
          :alt="props.senderName"
          shape="circle"
          class="message-bubble__avatar"
        />
      </template>
      <template v-else>
        <Avatar
          :image="props.senderAvatar"
          :alt="props.senderName"
          shape="circle"
          class="message-bubble__avatar"
        />
        <span class="message-bubble__sender">{{ props.senderName }}</span>
      </template>
    </div>

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
        >
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
      <p
        v-if="props.message.content"
        class="message-bubble__content"
      >
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
</template>

<style scoped lang="scss">
$avatar-size: 28px;
$avatar-gap: 8px;
$indent: calc(#{$avatar-size} + #{$avatar-gap});

.message-bubble {
  @include flex-column;
  align-items: flex-start;
  margin-bottom: $spacing-lg;
  animation: message-enter 250ms ease both;

  &--outgoing {
    align-items: flex-end;

    .message-bubble__body {
      background-color: #1e293b;
      border: 1px solid #1e293b;
    }

    .message-bubble__content {
      color: #ffffff;
    }

    .message-bubble__body,
    .message-bubble__time {
      margin-right: $indent;
      margin-left: 0;
    }

    .message-bubble__attachment-pdf {
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $avatar-gap;
    margin-bottom: $spacing-xs;
  }

  &__avatar {
    width: $avatar-size !important;
    height: $avatar-size !important;
    flex-shrink: 0;
  }

  &__sender {
    font-family: $font-family-base;
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 24px;
    letter-spacing: 0;
    color: #334155;
  }

  &__body {
    padding: $spacing-sm $spacing-md;
    background-color: #f3f7fb;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(4, 5, 6, 0.04);
    max-width: 65%;
    margin-left: $indent;
  }

  &__content {
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: #475569;
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
    font-family: $font-family-base;
    font-size: 12px;
    font-weight: $font-weight-regular;
    line-height: 20px;
    letter-spacing: 0;
    color: #64748b;
    margin-top: $spacing-xs;
    margin-left: $indent;
  }
}
</style>
