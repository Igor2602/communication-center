import { describe, it, expect } from 'vitest'
import { useCharacterLimit } from '@/composables/useCharacterLimit'

describe('useCharacterLimit', () => {
  it('initializes with empty text', () => {
    const { text, remaining, isOverLimit, percentage } = useCharacterLimit(100)

    expect(text.value).toBe('')
    expect(remaining.value).toBe(100)
    expect(isOverLimit.value).toBe(false)
    expect(percentage.value).toBe(0)
  })

  it('calculates remaining characters correctly', () => {
    const { text, remaining } = useCharacterLimit(100)

    text.value = 'Hello'
    expect(remaining.value).toBe(95)
  })

  it('detects when over limit', () => {
    const { text, isOverLimit } = useCharacterLimit(5)

    text.value = '12345'
    expect(isOverLimit.value).toBe(false)

    text.value = '123456'
    expect(isOverLimit.value).toBe(true)
  })

  it('calculates percentage correctly', () => {
    const { text, percentage } = useCharacterLimit(200)

    text.value = 'a'.repeat(100)
    expect(percentage.value).toBe(50)

    text.value = 'a'.repeat(200)
    expect(percentage.value).toBe(100)
  })

  it('caps percentage at 100 when over limit', () => {
    const { text, percentage } = useCharacterLimit(10)

    text.value = 'a'.repeat(20)
    expect(percentage.value).toBe(100)
  })

  it('returns remaining as negative when over limit', () => {
    const { text, remaining } = useCharacterLimit(10)

    text.value = 'a'.repeat(13)
    expect(remaining.value).toBe(-3)
  })
})
