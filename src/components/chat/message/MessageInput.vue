<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Attachment } from '@/types/chat'
import { useMessageComposer } from '@/composables/useMessageComposer'
import { useChatStore } from '@/stores/useChatStore'

const chatStore = useChatStore()

const pendingAttachment = ref<Attachment | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const fileAccept = ref('')
const isMenuOpen = ref(false)
const attachWrapperRef = ref<HTMLElement | null>(null)

const {
  content,
  characterCount,
  maxLength,
  isOverLimit,
  canSend,
  handleKeydown,
} = useMessageComposer(() => handleSend())

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (attachWrapperRef.value && !attachWrapperRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})

function pickFile() {
  fileAccept.value = '.pdf,.doc,.docx,.xls,.xlsx,.txt'
  closeMenu()
  requestAnimationFrame(() => fileInputRef.value?.click())
}

function pickImage() {
  fileAccept.value = 'image/*'
  closeMenu()
  requestAnimationFrame(() => fileInputRef.value?.click())
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const isImage = file.type.startsWith('image/')

  const reader = new FileReader()
  reader.onload = () => {
    pendingAttachment.value = {
      name: file.name,
      type: isImage ? 'image' : 'pdf',
      base64: reader.result as string,
    }
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function removeAttachment() {
  pendingAttachment.value = null
}

function handleSend() {
  const hasContent = content.value.trim().length > 0
  const hasAttachment = pendingAttachment.value !== null

  if (!hasContent && !hasAttachment) return
  if (isOverLimit.value) return

  chatStore.sendMessage(content.value, pendingAttachment.value ?? undefined)
  content.value = ''
  pendingAttachment.value = null
}
</script>

<template>
  <div class="message-input">
    <div
      v-if="pendingAttachment"
      class="message-input__preview"
    >
      <div class="message-input__preview-info">
        <i
          :class="pendingAttachment.type === 'image' ? 'pi pi-image' : 'pi pi-file-pdf'"
          class="message-input__preview-icon"
        />
        <span class="message-input__preview-name">{{ pendingAttachment.name }}</span>
      </div>
      <button
        type="button"
        class="message-input__preview-remove"
        aria-label="Remover anexo"
        @click="removeAttachment"
      >
        <i class="pi pi-times" />
      </button>
    </div>

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
      <input
        ref="fileInputRef"
        type="file"
        :accept="fileAccept"
        class="message-input__file-input"
        aria-label="Selecionar arquivo"
        tabindex="-1"
        @change="handleFileChange"
      >
      <div
        ref="attachWrapperRef"
        class="message-input__attach-wrapper"
      >
        <button
          type="button"
          class="message-input__attach"
          aria-label="Anexar arquivo"
          aria-haspopup="true"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <i class="pi pi-paperclip" />
        </button>
        <Transition name="attach-menu">
          <div
            v-if="isMenuOpen"
            class="message-input__menu"
            role="menu"
          >
            <button
              type="button"
              class="message-input__menu-item"
              role="menuitem"
              @click="pickFile"
            >
              <i class="pi pi-folder message-input__menu-icon message-input__menu-icon--file" />
              <span>Arquivo</span>
            </button>
            <button
              type="button"
              class="message-input__menu-item"
              role="menuitem"
              @click="pickImage"
            >
              <i class="pi pi-image message-input__menu-icon message-input__menu-icon--image" />
              <span>Imagens</span>
            </button>
          </div>
        </Transition>
      </div>
      <button
        type="button"
        class="message-input__send"
        aria-label="Enviar mensagem"
        :disabled="!canSend && !pendingAttachment"
        @click="handleSend"
      >
        <span>Enviar</span>
        <img
          src="@/assets/icons/icon-send.svg"
          alt=""
          class="message-input__send-icon"
        >
      </button>
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
  &__preview {
    @include flex-between;
    padding: $spacing-sm $spacing-md;
    margin-bottom: $spacing-sm;
    background-color: $color-bg-tertiary;
    border-radius: $radius-md;
    border: 1px solid $color-border;
  }

  &__preview-info {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    min-width: 0;
  }

  &__preview-icon {
    font-size: $font-size-base;
    color: $color-primary;
    flex-shrink: 0;
  }

  &__preview-name {
    font-size: $font-size-sm;
    color: $color-text-primary;
    @include truncate;
  }

  &__preview-remove {
    @include flex-center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: $color-text-secondary;
    border-radius: $radius-full;
    @include transition(background-color, color);

    &:hover {
      background-color: rgba($color-error, 0.1);
      color: $color-error;
    }

    i {
      font-size: $font-size-xs;
    }
  }

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

  &__file-input {
    display: none;
  }

  &__attach-wrapper {
    position: relative;
  }

  &__attach {
    @include flex-center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    color: #0768ac;
    @include transition(color);

    &:hover {
      color: $color-primary;
    }

    i {
      font-size: $font-size-lg;
    }
  }

  &__menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: $spacing-sm;
    min-width: 200px;
    background-color: $color-bg-primary;
    border: 1px solid $color-border;
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;
    padding: $spacing-xs 0;
    z-index: $z-dropdown;
  }

  &__menu-item {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    width: 100%;
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-sm;
    color: $color-text-primary;
    @include transition(background-color);

    &:hover {
      background-color: $color-bg-tertiary;
    }
  }

  &__menu-icon {
    font-size: $font-size-base;

    &--file {
      color: $color-primary;
    }

    &--image {
      color: $color-success;
    }
  }

  &__send {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    height: 38.5px;
    padding: 0 16px;
    flex-shrink: 0;
    background-color: #0768ac;
    border: 1px solid #0768ac;
    border-radius: $radius-md;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: #ffffff;
    cursor: pointer;
    @include transition(background-color);

    &:hover:not(:disabled) {
      background-color: #065a96;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__send-icon {
    width: 16px;
    height: 16px;
  }

  &__footer {
    margin-top: $spacing-xs;
    padding: 0 $spacing-xs;
  }

  &__counter {
    font-family: $font-family-base;
    font-size: 12px;
    font-weight: $font-weight-regular;
    line-height: 21px;
    letter-spacing: 0;
    color: #334155;

    &--over {
      color: $color-error;
      font-weight: $font-weight-semibold;
    }
  }

  &__separator {
    margin: 0 $spacing-xs;
    color: #334155;
  }
}

.attach-menu-enter-active,
.attach-menu-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.attach-menu-enter-from,
.attach-menu-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
