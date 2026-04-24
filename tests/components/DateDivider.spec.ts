import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateDivider from '@/components/chat/message/DateDivider.vue'

describe('DateDivider', () => {
  it('renders the label text', () => {
    const wrapper = mount(DateDivider, {
      props: { label: 'Hoje, 24/04' },
    })

    expect(wrapper.text()).toContain('Hoje, 24/04')
  })

  it('has separator role', () => {
    const wrapper = mount(DateDivider, {
      props: { label: 'Ontem, 23/04' },
    })

    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
  })

  it('renders two horizontal lines', () => {
    const wrapper = mount(DateDivider, {
      props: { label: '22/04/2026' },
    })

    const lines = wrapper.findAll('hr')
    expect(lines.length).toBe(2)
  })
})
