<script setup lang="ts">
import ConversationList from '@/components/chat/ConversationList.vue'
</script>

<template>
  <aside class="sidebar" aria-label="Conversations">
    <header class="sidebar__header">
      <h1 class="sidebar__title">Mensagens</h1>
    </header>

    <ConversationList />
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
    padding: $spacing-lg $spacing-lg $spacing-md;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}
</style>
