<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/chat'
import ConversationList from '@/components/chat/ConversationList.vue'
import ContactList from '@/components/chat/ContactList.vue'
import { useChatStore } from '@/stores/useChatStore'

const chatStore = useChatStore()

const isSelectingContact = ref(false)

function openContactList() {
  isSelectingContact.value = true
}

function closeContactList() {
  isSelectingContact.value = false
}

async function handleContactSelect(contact: User) {
  isSelectingContact.value = false
  await chatStore.startConversation(contact)
}
</script>

<template>
  <aside class="sidebar" aria-label="Conversas">
    <header class="sidebar__header">
      <div class="sidebar__header-text">
        <h1 class="sidebar__title">Central de Comunicação</h1>
        <p class="sidebar__subtitle">Comunicação interna</p>
      </div>
      <button
        v-if="!isSelectingContact"
        type="button"
        class="sidebar__new-chat"
        aria-label="Nova conversa"
        @click="openContactList"
      >
        <i class="pi pi-plus" />
      </button>
    </header>

    <ContactList
      v-if="isSelectingContact"
      @select="handleContactSelect"
      @back="closeContactList"
    />
    <ConversationList v-else />
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  @include flex-column;
  width: $sidebar-width;
  height: 100%;
  border-right: 1px solid $color-border;
  background-color: $color-bg-primary;

  &__header {
    @include flex-between;
    padding: $spacing-lg $spacing-lg $spacing-md;
  }

  &__header-text {
    @include flex-column;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: $line-height-tight;
  }

  &__subtitle {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    margin-top: 2px;
  }

  &__new-chat {
    @include flex-center;
    width: 36px;
    height: 36px;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    color: $color-primary;
    flex-shrink: 0;
    @include transition(background-color, border-color);

    &:hover {
      background-color: $color-bg-tertiary;
      border-color: $color-primary;
    }
  }
}
</style>
