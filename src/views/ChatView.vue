<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Attachment } from '@/types/chat'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageList from '@/components/chat/MessageList.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import MessageListSkeleton from '@/components/chat/MessageListSkeleton.vue'
import AttachmentPreview from '@/components/chat/AttachmentPreview.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import { useChatStore } from '@/stores/useChatStore'
import { currentUser } from '@/mocks/users'

const chatStore = useChatStore()

const previewVisible = ref(false)
const previewAttachment = ref<Attachment | null>(null)

onMounted(() => {
  chatStore.fetchConversations()
})

function handleArchive(conversationId: string) {
  chatStore.archiveConversation(conversationId)
}

function handleUnarchive(conversationId: string) {
  chatStore.unarchiveConversation(conversationId)
}

function handlePreviewAttachment(attachment: Attachment) {
  previewAttachment.value = attachment
  previewVisible.value = true
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

      <template #messages>
        <MessageListSkeleton v-if="chatStore.isLoadingMessages" />
        <MessageList
          v-else-if="chatStore.selectedConversation"
          :messages="chatStore.selectedMessages"
          :participant="chatStore.selectedConversation.participant"
          :current-user-avatar="currentUser.avatar"
          :is-typing="chatStore.isSelectedTyping"
          @preview-attachment="handlePreviewAttachment"
        />
        <BaseEmptyState
          v-else
          icon="pi pi-comments"
          title="Selecione uma conversa"
          description="Escolha uma conversa na lista ao lado para começar a trocar mensagens."
        />
      </template>

      <template v-if="chatStore.selectedConversation" #composer>
        <MessageInput />
      </template>
    </ChatContainer>

    <AttachmentPreview
      v-model:visible="previewVisible"
      :attachment="previewAttachment"
    />
  </div>
</template>

<style scoped lang="scss">
.chat-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
