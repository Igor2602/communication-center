<script setup lang="ts">
import type { Attachment } from '@/types/chat'
import Dialog from 'primevue/dialog'

defineProps<{
  attachment: Attachment | null
}>()

const visible = defineModel<boolean>('visible', { required: true })

</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="attachment?.name ?? 'Anexo'"
    modal
    dismissable-mask
    :style="{ width: '80vw', maxWidth: '900px' }"
    class="attachment-preview"
  >
    <div
      v-if="attachment"
      class="attachment-preview__content"
    >
      <img
        v-if="attachment.type === 'image'"
        :src="attachment.base64"
        :alt="attachment.name"
        class="attachment-preview__image"
      >
      <iframe
        v-else-if="attachment.type === 'pdf'"
        :src="attachment.base64"
        :title="attachment.name"
        class="attachment-preview__pdf"
      />
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.attachment-preview {
  &__content {
    @include flex-center;
    min-height: 300px;
  }

  &__image {
    max-width: 100%;
    max-height: 70vh;
    border-radius: $radius-md;
    object-fit: contain;
  }

  &__pdf {
    width: 100%;
    height: 70vh;
    border: none;
    border-radius: $radius-md;
  }
}
</style>
