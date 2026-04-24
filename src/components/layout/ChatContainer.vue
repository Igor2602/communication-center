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
  background-color: #ffffff;

  &__header {
    @include flex-between;
    height: 80px;
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    background-color: #ffffff;
  }

  &__messages {
    flex: 1;
    overflow: hidden;
  }

  &__composer {
    padding: 16px 16px 24px;
    gap: 10px;
    border-top: 1px solid #e2e8f0;
    background-color: #ffffff;
  }
}
</style>
