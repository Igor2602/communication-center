<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/chat'
import ConversationList from '@/components/chat/conversation/ConversationList.vue'
import ContactList from '@/components/chat/conversation/ContactList.vue'
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
  <aside
    class="sidebar"
    aria-label="Conversas"
  >
    <header class="sidebar__header">
      <div class="sidebar__header-text">
        <h1 class="sidebar__title">
          Central de Comunicação
        </h1>
        <p class="sidebar__subtitle">
          Comunicação interna
        </p>
      </div>
      <button
        v-if="!isSelectingContact"
        type="button"
        class="sidebar__new-chat"
        aria-label="Nova conversa"
        @click="openContactList"
      >
        <img
          src="@/assets/icons/icon-new-chat.svg"
          alt=""
          class="sidebar__new-chat-icon"
        >
      </button>
    </header>

    <nav
      class="sidebar__nav"
      aria-label="Navegação de conversas"
    >
      <ContactList
        v-if="isSelectingContact"
        @select="handleContactSelect"
        @back="closeContactList"
      />
      <ConversationList v-else />
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  @include flex-column;
  width: $sidebar-width;
  height: 100%;
  border-right: 1px solid $color-border;
  background-color: $color-bg-primary;

  @include media-between($breakpoint-md, $breakpoint-lg) {
    width: $sidebar-width-tablet;
  }

  @include media-down($breakpoint-md) {
    width: 100%;
    border-right: none;
  }

  &__nav {
    @include flex-column;
    flex: 1;
    overflow: hidden;
  }

  &__header {
    @include flex-between;
    height: $header-height;
    padding: $spacing-md;
    border-bottom: 1px solid $color-border;
  }

  &__header-text {
    @include flex-column;
  }

  &__title {
    font-family: $font-family-base;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    line-height: $line-height-relaxed;
    letter-spacing: 0;
    color: $color-text-primary;
  }

  &__subtitle {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-regular;
    line-height: $line-height-relaxed;
    letter-spacing: 0;
    color: $color-text-secondary;
    margin-top: 2px;
  }

  &__new-chat {
    @include flex-center;
    flex-shrink: 0;
    background-color: $color-bg-primary;
    border: none;
    cursor: pointer;
    @include transition(opacity);

    &:hover {
      opacity: 0.7;
    }
  }

  &__new-chat-icon {
    width: $icon-size-lg;
    height: $icon-size-lg;
  }
}
</style>
