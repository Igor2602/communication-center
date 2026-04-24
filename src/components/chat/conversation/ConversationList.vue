<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/useChatStore'
import { useDebounce } from '@/composables/useDebounce'
import SearchInput from '@/components/ui/SearchInput.vue'
import ConversationItem from './ConversationItem.vue'
import ConversationListSkeleton from './ConversationListSkeleton.vue'

const chatStore = useChatStore()

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)

const filteredConversations = computed(() => {
  const query = debouncedQuery.value.toLowerCase().trim()
  if (!query) return chatStore.displayedConversations

  return chatStore.displayedConversations.filter((conversation) =>
    conversation.participant.name.toLowerCase().includes(query) ||
    conversation.lastMessage.toLowerCase().includes(query),
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
    <div class="conversation-list__channels">
      <SearchInput
        v-model="searchQuery"
        placeholder="Buscar conversas"
        aria-label="Buscar conversas"
      />

      <div
        v-if="chatStore.isViewingArchived"
        class="conversation-list__archived-header"
      >
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

      <button
        v-if="!chatStore.isViewingArchived && chatStore.archivedCount > 0"
        type="button"
        class="conversation-list__archived-link"
        @click="showArchived"
      >
        <img
          src="@/assets/icons/icon-archive.svg"
          alt=""
          class="conversation-list__archived-icon"
        >
        <span>Conversas arquivadas</span>
      </button>
    </div>

    <ConversationListSkeleton v-if="chatStore.isLoadingConversations" />

    <div
      v-else
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
  </div>
</template>

<style scoped lang="scss">
.conversation-list {
  @include flex-column;
  height: 100%;
  overflow: hidden;

  &__channels {
    flex-shrink: 0;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__archived-header {
    padding: 0;
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

  &__archived-link {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    padding: 0;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    background-color: transparent;
    cursor: pointer;
  }

  &__archived-icon {
    width: 16px;
    height: 16px;
  }

  &__items {
    flex: 1;
    overflow-y: auto;
    @include custom-scrollbar;
  }

  &__no-results {
    padding: $spacing-lg;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }
}
</style>
