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

  @include media-between($breakpoint-md, $breakpoint-lg) {
    width: $sidebar-width-tablet;
  }

  @include media-down($breakpoint-md) {
    width: 100%;
    border-right: none;
  }

  &__header {
    @include flex-between;
    height: 80px;
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
  }

  &__header-text {
    @include flex-column;
  }

  &__title {
    font-family: $font-family-base;
    font-size: 18px;
    font-weight: $font-weight-medium;
    line-height: 26px;
    letter-spacing: 0;
    color: #334155;
  }

  &__subtitle {
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-regular;
    line-height: 22px;
    letter-spacing: 0;
    color: #64748b;
    margin-top: 2px;
  }

  &__new-chat {
    @include flex-center;
    flex-shrink: 0;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    @include transition(opacity);

    &:hover {
      opacity: 0.7;
    }
  }

  &__new-chat-icon {
    width: 20px;
    height: 21px;
  }
}
</style>
