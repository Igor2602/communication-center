import { nextTick, type Ref } from 'vue'

const SCROLL_THRESHOLD = 150

export function useAutoScroll(containerRef: Ref<HTMLElement | null>) {
  function isNearBottom(): boolean {
    const el = containerRef.value
    if (!el) return true

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    return distanceFromBottom <= SCROLL_THRESHOLD
  }

  function scrollToBottom(force = false) {
    nextTick(() => {
      const el = containerRef.value
      if (!el) return

      if (force || isNearBottom()) {
        el.scrollTop = el.scrollHeight
      }
    })
  }

  return { scrollToBottom }
}
