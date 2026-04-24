import { nextTick, type Ref } from 'vue'

const SCROLL_THRESHOLD = 150
const SCROLL_DURATION_MS = 600

export function useAutoScroll(containerRef: Ref<HTMLElement | null>) {
  function isNearBottom(): boolean {
    const el = containerRef.value
    if (!el) return true

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    return distanceFromBottom <= SCROLL_THRESHOLD
  }

  function smoothScrollTo(el: HTMLElement, target: number) {
    const start = el.scrollTop
    const distance = target - start
    if (distance === 0) return

    const startTime = performance.now()

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1)

      el.scrollTop = start + distance * easeOutCubic(progress)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  function scrollToBottom(force = false) {
    nextTick(() => {
      const el = containerRef.value
      if (!el) return

      if (force || isNearBottom()) {
        smoothScrollTo(el, el.scrollHeight)
      }
    })
  }

  return { scrollToBottom, isNearBottom }
}
