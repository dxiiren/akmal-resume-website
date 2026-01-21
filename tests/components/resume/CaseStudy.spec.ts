import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CaseStudy from '~/components/resume/CaseStudy.vue'
import type { Project } from '~/types/resume'

// Mock IntersectionObserver that auto-triggers
class MockIntersectionObserver {
  callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe() {
    // Auto-trigger intersection immediately
    this.callback(
      [{ isIntersecting: true, target: document.createElement('div') } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  unobserve() {}
  disconnect() {}

  static instances: MockIntersectionObserver[] = []
  static clear() {
    MockIntersectionObserver.instances = []
  }
}

const mockProjectWithCaseStudy: Project = {
  name: 'Shopify E-Commerce Integration',
  year: '2023',
  type: 'Integration',
  featured: true,
  impactMetric: '95% data mismatch → near-zero',
  technologies: ['PHP', 'Laravel', 'Shopify API', 'Webhooks', 'MySQL'],
  achievements: [
    'Built real-time webhook sync with idempotent processing',
    'Achieved 85% test coverage with 25% fewer regression defects',
  ],
  caseStudy: {
    problem: 'Critical 95% data mismatch between Shopify and internal ERP systems causing order fulfillment errors.',
    approach: 'Designed event-driven architecture with real-time webhooks, idempotent processing, and automated reconciliation.',
    solution: 'Custom integration handling orders, fulfillment, invoicing, and payments with comprehensive error handling.',
    results: [
      '95% data mismatch reduced to near-zero',
      '85% test coverage achieved',
      '25% reduction in regression defects',
      'Zero data loss during peak sales events',
    ],
    codeSnippet: {
      language: 'php',
      code: `// Idempotent webhook handler
public function handleOrderCreated(Request $request): JsonResponse
{
    $payload = $request->validated();
    return response()->json(['status' => 'ok']);
}`,
    },
  },
}

const mockProjectWithoutCodeSnippet: Project = {
  name: 'Test Project',
  year: '2024',
  type: 'Platform',
  featured: true,
  technologies: ['TypeScript', 'Vue.js'],
  achievements: ['Achievement 1'],
  caseStudy: {
    problem: 'Test problem statement.',
    approach: 'Test approach.',
    solution: 'Test solution.',
    results: ['Result 1', 'Result 2'],
  },
}

describe('CaseStudy Component', () => {
  beforeEach(() => {
    MockIntersectionObserver.clear()
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Rendering', () => {
    it('renders the case study section', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders the Featured Case Study badge', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('Featured Case Study')
    })

    it('renders the project name', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain(mockProjectWithCaseStudy.name)
    })
  })

  describe('Case Study Content', () => {
    it('renders the problem statement', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('The Problem')
      expect(wrapper.text()).toContain(mockProjectWithCaseStudy.caseStudy!.problem)
    })

    it('renders the approach section', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('The Approach')
      expect(wrapper.text()).toContain(mockProjectWithCaseStudy.caseStudy!.approach)
    })

    it('renders the solution section', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('The Solution')
      expect(wrapper.text()).toContain(mockProjectWithCaseStudy.caseStudy!.solution)
    })

    it('renders all results', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('The Results')
      mockProjectWithCaseStudy.caseStudy!.results.forEach((result) => {
        expect(wrapper.text()).toContain(result)
      })
    })
  })

  describe('Code Snippet', () => {
    it('renders code snippet when provided', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain(mockProjectWithCaseStudy.caseStudy!.codeSnippet!.language)
      expect(wrapper.text()).toContain('handleOrderCreated')
    })

    it('does not render code snippet section when not provided', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithoutCodeSnippet },
      })
      // When there's no code snippet, the code block section isn't rendered
      // The solution text is part of the code snippet section, so it won't appear
      expect(wrapper.text()).not.toContain('php')
      expect(wrapper.text()).not.toContain('handleOrderCreated')
    })
  })

  describe('Technologies', () => {
    it('renders all technology badges', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      mockProjectWithCaseStudy.technologies.forEach((tech) => {
        expect(wrapper.text()).toContain(tech)
      })
    })

    it('renders Badge components for technologies', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const badges = wrapper.findAllComponents({ name: 'Badge' })
      // At least one badge for Featured Case Study + tech badges
      expect(badges.length).toBeGreaterThanOrEqual(mockProjectWithCaseStudy.technologies.length + 1)
    })
  })

  describe('Terminal Styling', () => {
    it('renders terminal header with dots', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      // Check for terminal dots (red, yellow, green)
      const redDot = wrapper.find('.bg-red-500')
      const yellowDot = wrapper.find('.bg-yellow-500')
      const greenDot = wrapper.find('.bg-green-500')

      expect(redDot.exists()).toBe(true)
      expect(yellowDot.exists()).toBe(true)
      expect(greenDot.exists()).toBe(true)
    })

    it('renders terminal filename', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      expect(wrapper.text()).toContain('case-study.md')
    })
  })

  describe('Section Icons', () => {
    it('has colored section headers', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const html = wrapper.html()
      // Check for color classes used in section headers
      expect(html).toContain('text-red-400')
      expect(html).toContain('text-amber-400')
      expect(html).toContain('text-green-400')
    })
  })

  describe('Animations', () => {
    it('has opacity-0 class initially for animation', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const mainContainer = wrapper.find('.opacity-0')
      expect(mainContainer.exists()).toBe(true)
    })

    it('has animate-fade-in-up class', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const html = wrapper.html()
      expect(html).toContain('animate-fade-in-up')
    })
  })

  describe('Responsive Layout', () => {
    it('results grid has sm:grid-cols-2 for responsive layout', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const resultsGrid = wrapper.find('.sm\\:grid-cols-2')
      expect(resultsGrid.exists()).toBe(true)
    })
  })

  describe('Card Styling', () => {
    it('has rounded border styling', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const card = wrapper.find('.rounded-xl')
      expect(card.exists()).toBe(true)
    })

    it('has backdrop blur effect', async () => {
      const wrapper = await mountSuspended(CaseStudy, {
        props: { project: mockProjectWithCaseStudy },
      })
      const blurElement = wrapper.find('.backdrop-blur-sm')
      expect(blurElement.exists()).toBe(true)
    })
  })
})
