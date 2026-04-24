import { ref, computed } from 'vue'

export function useCharacterLimit(maxLength: number) {
  const text = ref('')

  const remaining = computed(() => maxLength - text.value.length)
  const isOverLimit = computed(() => text.value.length > maxLength)
  const percentage = computed(() => Math.min((text.value.length / maxLength) * 100, 100))

  return { text, remaining, isOverLimit, percentage, maxLength }
}
