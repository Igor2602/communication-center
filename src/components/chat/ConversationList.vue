<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/useChatStore'
import ConversationItem from './ConversationItem.vue'

const chatStore = useChatStore()

const searchQuery = ref('')

const filteredConversations = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return chatStore.conversations

  return chatStore.conversations.filter((conversation) =>
    conversation.participant.name.toLowerCase().includes(query),
  )
})

function handleSelect(conversationId: string) {
  chatStore.selectConversation(conversationId)
}
</script>

<template>
  <div class="conversation-list">
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
      aria-label="Conversations"
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.conversation-list {
  @include flex-column;
  height: 100%;

  &__search {
    padding: 0 $spacing-lg $spacing-md;
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
}
</style>
