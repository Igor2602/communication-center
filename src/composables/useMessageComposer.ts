import { computed, type Ref } from 'vue'
import { useCharacterLimit } from './useCharacterLimit'

const MAX_LENGTH = 2000

export function useMessageComposer(
  onSend: (content: string) => void,
  hasAttachment?: Ref<boolean>,
) {
  const { text: content, remaining, isOverLimit, percentage, maxLength } = useCharacterLimit(MAX_LENGTH)

  const characterCount = computed(() => content.value.length)
  const canSend = computed(() => {
    if (isOverLimit.value) return false
    const hasText = content.value.trim().length > 0
    const hasFile = hasAttachment?.value ?? false
    return hasText || hasFile
  })

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
    remaining,
    isOverLimit,
    percentage,
    maxLength,
    canSend,
    handleKeydown,
    send,
  }
}
