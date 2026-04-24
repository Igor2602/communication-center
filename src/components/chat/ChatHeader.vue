<script setup lang="ts">
import type { Conversation } from '@/types/chat'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

defineProps<{
  conversation: Conversation
}>()

const emit = defineEmits<{
  archive: [conversationId: string]
}>()
</script>

<template>
  <div class="chat-header">
    <div class="chat-header__info">
      <Avatar
        :image="conversation.participant.avatar"
        :alt="conversation.participant.name"
        shape="circle"
        class="chat-header__avatar"
      />
      <span class="chat-header__name">{{ conversation.participant.name }}</span>
    </div>

    <Button
      icon="pi pi-inbox"
      severity="secondary"
      text
      rounded
      aria-label="Arquivar conversa"
      class="chat-header__archive"
      @click="emit('archive', conversation.id)"
    />
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

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__archive {
    flex-shrink: 0;
  }
}
</style>
