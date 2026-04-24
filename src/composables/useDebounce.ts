import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timerId: ReturnType<typeof setTimeout>

  watch(source, (value) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  return debounced
}
