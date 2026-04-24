<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/useChatStore'
import ConversationItem from './ConversationItem.vue'

const chatStore = useChatStore()

const searchQuery = ref('')

const filteredConversations = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return chatStore.displayedConversations

  return chatStore.displayedConversations.filter((conversation) =>
    conversation.participant.name.toLowerCase().includes(query),
  )
})

function handleSelect(conversationId: string) {
  chatStore.selectConversation(conversationId)
}

function showArchived() {
  searchQuery.value = ''
  chatStore.setViewingArchived(true)
}

function showActive() {
  searchQuery.value = ''
  chatStore.setViewingArchived(false)
}
</script>

<template>
  <div class="conversation-list">
    <div v-if="chatStore.isViewingArchived" class="conversation-list__archived-header">
      <button
        type="button"
        class="conversation-list__back"
        aria-label="Voltar para conversas"
        @click="showActive"
      >
        <i class="pi pi-arrow-left" />
        <span>Conversas arquivadas</span>
      </button>
    </div>

    <div class="conversation-list__search">
      <input
        v-model="searchQuery"
        type="search"
        class="conversation-list__search-input"
        placeholder="Buscar conversas..."
        aria-label="Buscar conversas"
      />
    </div>

    <div
      class="conversation-list__items"
      role="listbox"
      :aria-label="chatStore.isViewingArchived ? 'Conversas arquivadas' : 'Conversas'"
    >
      <ConversationItem
        v-for="conversation in filteredConversations"
        :key="conversation.id"
        :conversation="conversation"
        :is-active="conversation.id === chatStore.selectedConversationId"
        @select="handleSelect"
      />

      <p
        v-if="filteredConversations.length === 0 && searchQuery"
        class="conversation-list__no-results"
      >
        Nenhuma conversa encontrada
      </p>

      <p
        v-if="filteredConversations.length === 0 && !searchQuery && chatStore.isViewingArchived"
        class="conversation-list__no-results"
      >
        Nenhuma conversa arquivada
      </p>
    </div>

    <button
      v-if="!chatStore.isViewingArchived && chatStore.archivedCount > 0"
      type="button"
      class="conversation-list__archived-link"
      @click="showArchived"
    >
      <i class="pi pi-inbox" />
      <span>Conversas arquivadas</span>
      <span class="conversation-list__archived-count">{{ chatStore.archivedCount }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.conversation-list {
  @include flex-column;
  height: 100%;

  &__archived-header {
    padding: $spacing-sm $spacing-lg;
    border-bottom: 1px solid $color-border;
  }

  &__back {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    @include transition(color);

    &:hover {
      color: $color-primary-dark;
    }
  }

  &__search {
    padding: $spacing-md $spacing-lg;
  }

  &__search-input {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    color: $color-text-primary;
    background-color: $color-bg-secondary;
    outline: none;
    @include transition(border-color, box-shadow);

    &::placeholder {
      color: $color-text-secondary;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.15);
    }
  }

  &__items {
    flex: 1;
    overflow-y: auto;
  }

  &__no-results {
    padding: $spacing-lg;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }

  &__archived-link {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-md $spacing-lg;
    border-top: 1px solid $color-border;
    font-size: $font-size-sm;
    color: $color-primary;
    @include transition(background-color);

    &:hover {
      background-color: $color-bg-tertiary;
    }

    i {
      font-size: $font-size-base;
    }
  }

  &__archived-count {
    margin-left: auto;
    padding: 1px $spacing-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-inverse;
    background-color: $color-secondary;
    border-radius: $radius-full;
    min-width: 20px;
    text-align: center;
  }
}
</style>
