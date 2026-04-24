<script setup lang="ts">
import type { ChatHeaderProps, ChatHeaderEmits } from './types'
import Avatar from 'primevue/avatar'
import iconArchive from '@/assets/icons/icon-archive.svg'

const props = withDefaults(defineProps<ChatHeaderProps>(), {
  showBack: false,
})

const emit = defineEmits<ChatHeaderEmits>()

function handleToggleArchive() {
  if (props.conversation.isArchived) {
    emit('unarchive', props.conversation.id)
  } else {
    emit('archive', props.conversation.id)
  }
}
</script>

<template>
  <div class="chat-header">
    <div class="chat-header__info">
      <button
        v-if="showBack"
        type="button"
        class="chat-header__back"
        aria-label="Voltar para conversas"
        @click="emit('back')"
      >
        <i class="pi pi-arrow-left" />
      </button>
      <Avatar
        :image="conversation.participant.avatar"
        :alt="conversation.participant.name"
        shape="circle"
        class="chat-header__avatar"
      />
      <span class="chat-header__name">{{ conversation.participant.name }}</span>
    </div>

    <button
      type="button"
      class="chat-header__archive"
      :aria-label="conversation.isArchived ? 'Desarquivar' : 'Arquivar'"
      @click="handleToggleArchive"
    >
      <img
        :src="iconArchive"
        alt=""
        class="chat-header__archive-icon"
      >
      <span>{{ conversation.isArchived ? 'Desarquivar' : 'Arquivar' }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.chat-header {
  @include flex-between;
  width: 100%;

  &__info {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__back {
    @include flex-center;
    width: 32px;
    height: 32px;
    color: $color-text-secondary;
    flex-shrink: 0;
    @include transition(color);

    &:hover {
      color: $color-primary;
    }

    i {
      font-size: $font-size-base;
    }
  }

  &__avatar {
    width: $avatar-size-md !important;
    height: $avatar-size-md !important;
    flex-shrink: 0;
  }

  &__name {
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    line-height: $line-height-base;
    letter-spacing: 0;
    color: $color-text-primary;
  }

  &__archive {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $button-gap;
    height: $button-height;
    padding: 0 $button-padding-h;
    flex-shrink: 0;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background-color: transparent;
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: $color-text-secondary;
    cursor: pointer;
    @include transition(background-color, border-color);

    &:hover {
      background-color: $color-bg-tertiary;
      border-color: $color-border-hover;
    }
  }

  &__archive-icon {
    width: $icon-size-md;
    height: $icon-size-md;
  }
}
</style>
