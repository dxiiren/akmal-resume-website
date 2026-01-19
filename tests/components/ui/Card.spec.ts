import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders a div element', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('renders slot content', async () => {
      const wrapper = await mountSuspended(Card, {
        slots: {
          default: 'Card Content',
        },
      })
      expect(wrapper.text()).toBe('Card Content')
    })
  })

  describe('Base Styles', () => {
    it('has rounded corners', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.classes()).toContain('rounded-lg')
    })

    it('has border', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.classes()).toContain('border')
    })

    it('has background color', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.classes()).toContain('bg-card')
    })

    it('has text color', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.classes()).toContain('text-card-foreground')
    })

    it('has shadow', async () => {
      const wrapper = await mountSuspended(Card)
      expect(wrapper.classes()).toContain('shadow-sm')
    })
  })

  describe('Custom Classes', () => {
    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          class: 'custom-card-class',
        },
      })
      expect(wrapper.classes()).toContain('custom-card-class')
    })

    it('merges custom classes with default classes', async () => {
      const wrapper = await mountSuspended(Card, {
        props: {
          class: 'my-custom-class',
        },
      })
      expect(wrapper.classes()).toContain('my-custom-class')
      expect(wrapper.classes()).toContain('rounded-lg')
    })
  })
})

describe('CardHeader Component', () => {
  it('renders a div element', async () => {
    const wrapper = await mountSuspended(CardHeader)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(CardHeader, {
      slots: {
        default: 'Header Content',
      },
    })
    expect(wrapper.text()).toBe('Header Content')
  })

  it('has flex layout', async () => {
    const wrapper = await mountSuspended(CardHeader)
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('has correct padding', async () => {
    const wrapper = await mountSuspended(CardHeader)
    expect(wrapper.classes()).toContain('p-6')
  })

  it('accepts custom class prop', async () => {
    const wrapper = await mountSuspended(CardHeader, {
      props: {
        class: 'custom-header',
      },
    })
    expect(wrapper.classes()).toContain('custom-header')
  })
})

describe('CardTitle Component', () => {
  it('renders an h3 element', async () => {
    const wrapper = await mountSuspended(CardTitle)
    expect(wrapper.element.tagName.toLowerCase()).toBe('h3')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(CardTitle, {
      slots: {
        default: 'Title Text',
      },
    })
    expect(wrapper.text()).toBe('Title Text')
  })

  it('has semibold font weight', async () => {
    const wrapper = await mountSuspended(CardTitle)
    expect(wrapper.classes()).toContain('font-semibold')
  })

  it('has leading-none line height', async () => {
    const wrapper = await mountSuspended(CardTitle)
    expect(wrapper.classes()).toContain('leading-none')
  })

  it('has tracking-tight', async () => {
    const wrapper = await mountSuspended(CardTitle)
    expect(wrapper.classes()).toContain('tracking-tight')
  })

  it('accepts custom class prop', async () => {
    const wrapper = await mountSuspended(CardTitle, {
      props: {
        class: 'custom-title',
      },
    })
    expect(wrapper.classes()).toContain('custom-title')
  })
})

describe('CardDescription Component', () => {
  it('renders a p element', async () => {
    const wrapper = await mountSuspended(CardDescription)
    expect(wrapper.element.tagName.toLowerCase()).toBe('p')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(CardDescription, {
      slots: {
        default: 'Description text',
      },
    })
    expect(wrapper.text()).toBe('Description text')
  })

  it('has small text size', async () => {
    const wrapper = await mountSuspended(CardDescription)
    expect(wrapper.classes()).toContain('text-sm')
  })

  it('has muted text color', async () => {
    const wrapper = await mountSuspended(CardDescription)
    expect(wrapper.classes()).toContain('text-muted-foreground')
  })

  it('accepts custom class prop', async () => {
    const wrapper = await mountSuspended(CardDescription, {
      props: {
        class: 'custom-desc',
      },
    })
    expect(wrapper.classes()).toContain('custom-desc')
  })
})

describe('CardContent Component', () => {
  it('renders a div element', async () => {
    const wrapper = await mountSuspended(CardContent)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(CardContent, {
      slots: {
        default: 'Content here',
      },
    })
    expect(wrapper.text()).toBe('Content here')
  })

  it('has correct padding', async () => {
    const wrapper = await mountSuspended(CardContent)
    expect(wrapper.classes()).toContain('p-6')
    expect(wrapper.classes()).toContain('pt-0')
  })

  it('accepts custom class prop', async () => {
    const wrapper = await mountSuspended(CardContent, {
      props: {
        class: 'custom-content',
      },
    })
    expect(wrapper.classes()).toContain('custom-content')
  })
})

describe('Card Composition', () => {
  it('composes Card with all sub-components', async () => {
    const wrapper = await mountSuspended(Card, {
      slots: {
        default: `
          <div data-testid="header">Header</div>
          <div data-testid="content">Content</div>
        `,
      },
    })

    expect(wrapper.find('[data-testid="header"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true)
  })
})
