import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with source value', () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    expect(debounced.value).toBe('hello')
  })

  it('does not update immediately on source change', async () => {
    const source = ref('initial')
    const debounced = useDebounce(source, 300)

    source.value = 'updated'
    await nextTick()

    expect(debounced.value).toBe('initial')
  })

  it('updates after delay', async () => {
    const source = ref('initial')
    const debounced = useDebounce(source, 300)

    source.value = 'updated'
    await nextTick()

    vi.advanceTimersByTime(300)
    expect(debounced.value).toBe('updated')
  })

  it('resets timer on rapid changes', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 300)

    source.value = 'b'
    await nextTick()
    vi.advanceTimersByTime(200)

    source.value = 'c'
    await nextTick()
    vi.advanceTimersByTime(200)

    expect(debounced.value).toBe('a')

    vi.advanceTimersByTime(100)
    expect(debounced.value).toBe('c')
  })

  it('uses default delay of 300ms', async () => {
    const source = ref('start')
    const debounced = useDebounce(source)

    source.value = 'end'
    await nextTick()

    vi.advanceTimersByTime(299)
    expect(debounced.value).toBe('start')

    vi.advanceTimersByTime(1)
    expect(debounced.value).toBe('end')
  })
})
