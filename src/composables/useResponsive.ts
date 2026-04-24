import { ref, onMounted, onUnmounted } from 'vue'

const BREAKPOINT_MOBILE = 768
const BREAKPOINT_TABLET = 1024

/**
 * Reactive breakpoint detection via window resize listener.
 * Listener is cleaned up on component unmount.
 */
export function useResponsive() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)

  function update() {
    const width = window.innerWidth
    isMobile.value = width < BREAKPOINT_MOBILE
    isTablet.value = width >= BREAKPOINT_MOBILE && width < BREAKPOINT_TABLET
    isDesktop.value = width >= BREAKPOINT_TABLET
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile, isTablet, isDesktop }
}
