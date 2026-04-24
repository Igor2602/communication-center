<script setup lang="ts">
import type { ChatHeaderProps, ChatHeaderEmits } from './types'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

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

    <Button
      :icon="conversation.isArchived ? 'pi pi-replay' : 'pi pi-inbox'"
      :label="conversation.isArchived ? 'Desarquivar' : 'Arquivar'"
      severity="secondary"
      outlined
      :aria-label="conversation.isArchived ? 'Desarquivar' : 'Arquivar'"
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
