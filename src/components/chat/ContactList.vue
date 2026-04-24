<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from '@/types/chat'
import Avatar from 'primevue/avatar'
import { useChatStore } from '@/stores/useChatStore'
import { useDebounce } from '@/composables/useDebounce'

const emit = defineEmits<{
  select: [contact: User]
  back: []
}>()

const chatStore = useChatStore()
const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)

const filteredContacts = computed(() => {
  const query = debouncedQuery.value.toLowerCase().trim()
  if (!query) return chatStore.contacts

  return chatStore.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query),
  )
})

onMounted(() => {
  chatStore.fetchContacts()
})
</script>

<template>
  <div class="contact-list">
    <div class="contact-list__header">
      <button
        type="button"
        class="contact-list__back"
        aria-label="Voltar para conversas"
        @click="emit('back')"
      >
        <i class="pi pi-arrow-left" />
        <span>Nova conversa</span>
      </button>
    </div>

    <div class="contact-list__search">
      <div class="contact-list__search-wrapper">
        <i class="pi pi-search contact-list__search-icon" />
        <input
          v-model="searchQuery"
          type="search"
          class="contact-list__search-input"
          placeholder="Buscar contatos..."
          aria-label="Buscar contatos"
        />
      </div>
    </div>

    <div class="contact-list__items" role="listbox" aria-label="Contatos">
      <button
        v-for="contact in filteredContacts"
        :key="contact.id"
        type="button"
        class="contact-list__item"
        role="option"
        :aria-label="`Iniciar conversa com ${contact.name}`"
        @click="emit('select', contact)"
      >
        <Avatar
          :image="contact.avatar"
          :alt="contact.name"
          shape="circle"
          size="large"
          class="contact-list__avatar"
        />
        <span class="contact-list__name">{{ contact.name }}</span>
      </button>

      <p
        v-if="filteredContacts.length === 0 && searchQuery"
        class="contact-list__no-results"
      >
        Nenhum contato encontrado
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-list {
  @include flex-column;
  height: 100%;

  &__header {
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

  &__search-wrapper {
    position: relative;
  }

  &__search-icon {
    position: absolute;
    left: $spacing-md;
    top: 50%;
    transform: translateY(-50%);
    font-size: $font-size-sm;
    color: $color-text-secondary;
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    padding: $spacing-sm $spacing-md $spacing-sm 2.25rem;
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

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    width: 100%;
    padding: $spacing-sm $spacing-lg;
    text-align: left;
    @include transition(background-color);

    &:hover {
      background-color: $color-bg-tertiary;
    }
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__no-results {
    padding: $spacing-lg;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }
}
</style>
