<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageList from '@/components/chat/MessageList.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import { useChatStore } from '@/stores/useChatStore'
import { currentUser } from '@/mocks/users'

const chatStore = useChatStore()

onMounted(() => {
  chatStore.fetchConversations()
})

function handleArchive(conversationId: string) {
  chatStore.archiveConversation(conversationId)
}

function handleUnarchive(conversationId: string) {
  chatStore.unarchiveConversation(conversationId)
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
          @unarchive="handleUnarchive"
        />
      </template>
      <template v-if="chatStore.selectedConversation" #messages>
        <MessageList
          :messages="chatStore.selectedMessages"
          :participant="chatStore.selectedConversation.participant"
          :current-user-avatar="currentUser.avatar"
          :is-typing="chatStore.isSelectedTyping"
        />
      </template>
      <template v-if="chatStore.selectedConversation" #composer>
        <MessageInput />
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
