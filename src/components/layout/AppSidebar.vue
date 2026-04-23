<script setup lang="ts">
</script>

<template>
  <aside class="sidebar" aria-label="Conversations">
    <header class="sidebar__header">
      <h1 class="sidebar__title">Messages</h1>
    </header>

    <div class="sidebar__search">
      <slot name="search">
        <span class="sidebar__search-placeholder">Search</span>
      </slot>
    </div>

    <nav class="sidebar__list" aria-label="Conversation list">
      <slot name="conversations">
        <p class="sidebar__empty">No conversations</p>
      </slot>
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

  &__header {
    padding: $spacing-lg $spacing-lg $spacing-md;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__search {
    padding: 0 $spacing-lg $spacing-md;
  }

  &__search-placeholder {
    display: block;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }

  &__list {
    flex: 1;
    overflow-y: auto;
  }

  &__empty {
    padding: $spacing-lg;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }
}
</style>
