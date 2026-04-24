<script setup lang="ts">
import Button from 'primevue/button'
import { useMessageComposer } from '@/composables/useMessageComposer'
import { useChatStore } from '@/stores/useChatStore'

const chatStore = useChatStore()

const {
  content,
  characterCount,
  maxLength,
  isOverLimit,
  canSend,
  handleKeydown,
  send,
} = useMessageComposer((text) => chatStore.sendMessage(text))
</script>

<template>
  <div class="message-input">
    <div class="message-input__field">
      <textarea
        v-model="content"
        class="message-input__textarea"
        :class="{ 'message-input__textarea--over-limit': isOverLimit }"
        placeholder="Digite uma mensagem..."
        aria-label="Mensagem"
        rows="1"
        @keydown="handleKeydown"
      />
      <Button
        icon="pi pi-send"
        rounded
        aria-label="Enviar mensagem"
        class="message-input__send"
        :disabled="!canSend"
        @click="send"
      />
    </div>

    <div class="message-input__footer">
      <span class="message-input__hint">
        <kbd>Shift</kbd> + <kbd>Enter</kbd> para nova linha
      </span>
      <span
        class="message-input__counter"
        :class="{ 'message-input__counter--over': isOverLimit }"
      >
        {{ characterCount }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-input {
  &__field {
    display: flex;
    align-items: flex-end;
    gap: $spacing-sm;
  }

  &__textarea {
    flex: 1;
    resize: none;
    min-height: 40px;
    max-height: 120px;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-family: $font-family-base;
    font-size: $font-size-sm;
    line-height: $line-height-base;
    color: $color-text-primary;
    background-color: $color-bg-secondary;
    outline: none;
    @include transition(border-color, box-shadow);
    field-sizing: content;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.15);
    }

    &--over-limit {
      border-color: $color-error;

      &:focus {
        border-color: $color-error;
        box-shadow: 0 0 0 2px rgba($color-error, 0.15);
      }
    }
  }

  &__send {
    flex-shrink: 0;
  }

  &__footer {
    @include flex-between;
    margin-top: $spacing-xs;
    padding: 0 $spacing-xs;
  }

  &__hint {
    font-size: $font-size-xs;
    color: $color-text-secondary;

    kbd {
      padding: 1px 4px;
      font-family: $font-family-base;
      font-size: $font-size-xs;
      background-color: $color-bg-tertiary;
      border: 1px solid $color-border;
      border-radius: $radius-sm;
    }
  }

  &__counter {
    font-size: $font-size-xs;
    color: $color-text-secondary;

    &--over {
      color: $color-error;
      font-weight: $font-weight-semibold;
    }
  }
}
</style>
