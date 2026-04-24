import { ref, computed } from 'vue'

const MAX_LENGTH = 500

export function useMessageComposer(onSend: (content: string) => void) {
  const content = ref('')

  const characterCount = computed(() => content.value.length)
  const isOverLimit = computed(() => characterCount.value > MAX_LENGTH)
  const canSend = computed(() => content.value.trim().length > 0 && !isOverLimit.value)

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      send()
    }
  }

  function send() {
    if (!canSend.value) return
    onSend(content.value)
    content.value = ''
  }

  return {
    content,
    characterCount,
    maxLength: MAX_LENGTH,
    isOverLimit,
    canSend,
    handleKeydown,
    send,
  }
}
