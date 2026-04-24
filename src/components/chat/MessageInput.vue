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
        placeholder="Escreva uma mensagem"
        aria-label="Mensagem"
        rows="1"
        @keydown="handleKeydown"
      />
      <button
        type="button"
        class="message-input__attach"
        aria-label="Anexar arquivo"
      >
        <i class="pi pi-paperclip" />
      </button>
      <Button
        icon="pi pi-send"
        label="Enviar"
        aria-label="Enviar mensagem"
        class="message-input__send"
        :disabled="!canSend"
        @click="send"
      />
    </div>

    <div class="message-input__footer">
      <span class="message-input__counter">
        <span :class="{ 'message-input__counter--over': isOverLimit }">
          {{ characterCount }}/{{ maxLength }} caracteres
        </span>
        <span class="message-input__separator">|</span>
        <span>Shift + Enter para adicionar uma nova linha</span>
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
    background-color: $color-bg-primary;
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

  &__attach {
    @include flex-center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    color: $color-text-secondary;
    @include transition(color);

    &:hover {
      color: $color-primary;
    }

    i {
      font-size: $font-size-lg;
    }
  }

  &__send {
    flex-shrink: 0;
  }

  &__footer {
    margin-top: $spacing-xs;
    padding: 0 $spacing-xs;
  }

  &__counter {
    font-size: $font-size-xs;
    color: $color-text-secondary;

    &--over {
      color: $color-error;
      font-weight: $font-weight-semibold;
    }
  }

  &__separator {
    margin: 0 $spacing-xs;
    color: $color-border;
  }
}
</style>
