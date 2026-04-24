<script setup lang="ts">
import type { Conversation } from '@/types/chat'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

const props = defineProps<{
  conversation: Conversation
}>()

const emit = defineEmits<{
  archive: [conversationId: string]
  unarchive: [conversationId: string]
}>()

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
      <Avatar
        :image="conversation.participant.avatar"
        :alt="conversation.participant.name"
        shape="circle"
        class="chat-header__avatar"
      />
      <span class="chat-header__name">{{ conversation.participant.name }}</span>
    </div>

    <Button
      :icon="conversation.isArchived ? 'pi pi-replay' : 'pi pi-inbox'"
      :label="conversation.isArchived ? 'Desarquivar' : 'Arquivar'"
      severity="secondary"
      text
      :aria-label="conversation.isArchived ? 'Desarquivar conversa' : 'Arquivar conversa'"
      class="chat-header__archive"
      @click="handleToggleArchive"
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
