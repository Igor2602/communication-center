<script setup lang="ts">
</script>

<template>
  <section
    class="chat-container"
    aria-label="Chat"
  >
    <header
      v-if="$slots.header"
      class="chat-container__header"
    >
      <slot name="header" />
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
  background-color: $color-bg-primary;

  &__header {
    @include flex-between;
    height: $header-height;
    padding: $spacing-md;
    border-bottom: 1px solid $color-border;
    background-color: $color-bg-primary;
  }

  &__messages {
    flex: 1;
    overflow: hidden;
  }

  &__composer {
    padding: $spacing-md $spacing-md $spacing-lg;
    gap: 10px;
    border-top: 1px solid $color-border;
    background-color: $color-bg-primary;
  }
}
</style>
