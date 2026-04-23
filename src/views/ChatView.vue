<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
import { useChatStore } from '@/stores/useChatStore'

const chatStore = useChatStore()

onMounted(() => {
  chatStore.fetchConversations()
})
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
