<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
</script>

<template>
  <div class="chat-view">
    <AppSidebar />
    <ChatContainer />
  </div>
</template>

<style scoped lang="scss">
.chat-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
