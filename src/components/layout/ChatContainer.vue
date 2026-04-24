<script setup lang="ts">
</script>

<template>
  <section class="chat-container" aria-label="Chat">
    <header class="chat-container__header">
      <slot name="header">
        <span class="chat-container__header-placeholder">Selecione uma conversa</span>
      </slot>
    </header>

    <main class="chat-container__messages">
      <slot name="messages" />
    </main>

    <footer class="chat-container__composer">
      <slot name="composer" />
    </footer>
  </section>
</template>

<style scoped lang="scss">
.chat-container {
  @include flex-column;
  flex: 1;
  height: 100%;
  background-color: $color-bg-secondary;

  &__header {
    @include flex-between;
    padding: $spacing-md $spacing-lg;
    border-bottom: 1px solid $color-border;
    background-color: $color-bg-primary;
    min-height: 64px;
  }

  &__header-placeholder {
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }

  &__messages {
    flex: 1;
    overflow: hidden;
  }

  &__composer {
    padding: $spacing-md $spacing-lg;
    border-top: 1px solid $color-border;
    background-color: $color-bg-primary;
  }
}
</style>
