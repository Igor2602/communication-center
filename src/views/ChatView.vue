<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import { useChatStore } from '@/stores/useChatStore'

const chatStore = useChatStore()

onMounted(() => {
  chatStore.fetchConversations()
})

function handleArchive(conversationId: string) {
  chatStore.archiveConversation(conversationId)
}
</script>

<template>
  <div class="chat-view">
    <AppSidebar />
    <ChatContainer>
      <template v-if="chatStore.selectedConversation" #header>
        <ChatHeader
          :conversation="chatStore.selectedConversation"
          @archive="handleArchive"
        />
      </template>
    </ChatContainer>
  </div>
</template>

<style scoped lang="scss">
.chat-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
