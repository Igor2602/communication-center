<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Attachment } from '@/types/chat'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ChatContainer from '@/components/layout/ChatContainer.vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageList from '@/components/chat/message/MessageList.vue'
import MessageInput from '@/components/chat/message/MessageInput.vue'
import MessageListSkeleton from '@/components/chat/message/MessageListSkeleton.vue'
import AttachmentPreview from '@/components/chat/message/AttachmentPreview.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import { useChatStore } from '@/stores/useChatStore'
import { useResponsive } from '@/composables/useResponsive'
import { currentUser } from '@/mocks/users'

const chatStore = useChatStore()
const { isMobile } = useResponsive()

const showChat = ref(false)
const previewVisible = ref(false)
const previewAttachment = ref<Attachment | null>(null)

onMounted(() => {
  chatStore.fetchConversations()
})

// On mobile, open chat panel when a conversation is selected
watch(
  () => chatStore.selectedConversationId,
  (id) => {
    if (id && isMobile.value) {
      showChat.value = true
    }
  },
)

function handleBack() {
  showChat.value = false
  chatStore.selectedConversationId = null
}

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
    <AppSidebar
      v-show="!isMobile || !showChat"
      :class="{ 'chat-view__sidebar--mobile': isMobile }"
    />
    <ChatContainer
      v-show="!isMobile || showChat"
      :class="{ 'chat-view__main--mobile': isMobile }"
    >
      <template
        v-if="chatStore.selectedConversation"
        #header
      >
        <ChatHeader
          :conversation="chatStore.selectedConversation"
          :show-back="isMobile"
          @archive="handleArchive"
          @unarchive="handleUnarchive"
          @back="handleBack"
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

      <template
        v-if="chatStore.selectedConversation"
        #composer
      >
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

  &__sidebar--mobile {
    width: 100%;
    flex-shrink: 0;
  }

  &__main--mobile {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
