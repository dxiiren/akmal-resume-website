# A+ Resume Website Improvement Plan

## Goal
Achieve A+ rating in all 5 categories (excluding testimonials for now):
1. Technical Quality: A → A+
2. Design/UX: B+ → A+
3. Content/Copy: B → A+
4. Call-to-Action: C+ → A+
5. Competitive Edge: B → A+

---

## Phase 1: Quick Wins (High Impact, Low Effort)

### 1.1 Hero Section - Availability & CTA Improvements
**Files:** `components/resume/Hero.vue`, `data/resume.ts`

**Changes:**
- Add prominent availability badge below tagline: `🟢 Open to Backend/Full-Stack Opportunities (Remote/Malaysia)`
- Change "Let's Talk" button text → **"Hire Me"** or **"Get In Touch"**
- Add subtitle under CTA: "Usually respond within 24 hours"
- Make WhatsApp button more prominent (larger, with text label on desktop)
- Remove or hide the disabled "Schedule a Call" button entirely

### 1.2 Summary Rewrite - Lead with Impact
**Files:** `data/resume.ts`

**Current:**
> "Backend Engineer with 4+ years of experience designing..."

**New (lead with proof):**
> "I reduced a 95% data mismatch problem to near-zero at YoPrint and optimized queries from 1+ minute to under 2 seconds at Biztory. Backend Engineer with 4+ years building production systems that handle 50K+ daily transactions at 99.9% uptime."

### 1.3 README Badges
**Files:** `README.md`

Add badges at top:
- Test coverage badge (static or from coverage report)
- TypeScript badge
- Vue 3 / Nuxt 3 badges
- License badge

---

## Phase 2: Case Study Addition (Highest Impact for Content/Copy & Competitive Edge)

### 2.1 Create Case Study Component
**New File:** `components/resume/CaseStudy.vue`

Terminal-styled deep dive component showing:
- Problem statement
- Technical approach
- Solution architecture (code snippet)
- Results with metrics
- Technologies used

### 2.2 Extend Project Type
**Files:** `types/resume.ts`

```typescript
export interface ProjectCaseStudy {
  problem: string
  approach: string
  solution: string
  results: string[]
  codeSnippet?: {
    language: string
    code: string
  }
}

// Add to Project interface:
caseStudy?: ProjectCaseStudy
featured?: boolean
```

### 2.3 Add Shopify Integration Case Study Data
**Files:** `data/resume.ts`

Featured project: **Shopify Integration at YoPrint**
- Problem: 95% data mismatch between Shopify and internal systems
- Approach: Real-time webhook sync, idempotent processing, reconciliation jobs
- Solution: Custom integration handling orders, fulfillment, invoicing, payments
- Results: 95% mismatch reduction, 85% test coverage, 25% fewer regression defects

### 2.4 Update Projects Section
**Files:** `components/resume/Projects.vue`

- Add "Featured Case Study" inline section at top before project grid
- Always visible, no click required
- Terminal-styled with problem/solution/results layout

---

## Phase 3: Design/UX Enhancements

### 3.1 Dark Mode Toggle Visibility
**Files:** `components/layout/Header.vue`

- Make theme toggle more prominent in header (not just an icon)
- Add tooltip or label on hover

### 3.2 Stats Animation Trigger on Scroll
**Files:** `components/resume/Hero.vue`

Current: Stats animate on page load
Change: Stats animate when scrolled into view using `useScrollAnimation`

### 3.3 ~~Project Screenshots~~ SKIPPED
User confirmed no screenshots available. Case study will be text-focused with code snippets and metrics.

---

## Phase 4: Technical Quality - E2E Tests & Proof

### 4.1 Add Critical E2E User Journey Tests
**Files:** `e2e/user-journey.spec.ts` (new)

Test scenarios:
1. Load homepage → verify all sections render
2. Click "Hire Me" CTA → verify mailto link
3. Click WhatsApp → verify opens correct link
4. Scroll through page → verify animations trigger
5. Toggle dark mode → verify theme changes
6. Navigate via header → verify smooth scroll to sections

### 4.2 Add Coverage Badge to README
**Files:** `README.md`

Use shields.io static badge:
```markdown
![Coverage](https://img.shields.io/badge/coverage-99%25-brightgreen)
```

### 4.3 Lighthouse Score Section (Optional)
**Files:** `README.md`

Add Lighthouse scores (Performance, Accessibility, SEO, Best Practices) as proof of quality.

---

## Phase 5: Competitive Edge - Unique Positioning

### 5.1 Add Niche Positioning Statement
**Files:** `data/resume.ts`, `components/resume/Hero.vue`

Current roles: `['Backend Engineer', 'Problem Solver', 'System Architect', 'API Specialist']`

Add unique positioning subtitle:
> "The backend engineer who ships with 99% test coverage"

Or integrate into tagline area.

### 5.2 Proof Elements
**Files:** Various

- Show test coverage number prominently (Hero stats or About section)
- Add static coverage badge in README (no GitHub link - repo stays private)
- Consider adding a "Built with 99% test coverage" line in footer or about section

---

## File Change Summary

| File | Changes |
|------|---------|
| `components/resume/Hero.vue` | Availability badge, CTA text, WhatsApp prominence, remove disabled button, scroll-triggered stats |
| `data/resume.ts` | New summary, case study data, positioning statement |
| `types/resume.ts` | ProjectCaseStudy interface, featured flag |
| `components/resume/CaseStudy.vue` | NEW - Inline case study display component (terminal-styled) |
| `components/resume/Projects.vue` | Integrate CaseStudy component at top |
| `components/layout/Header.vue` | More visible dark mode toggle |
| `README.md` | Badges (coverage, TypeScript, Vue, Nuxt) - static, no GitHub link |
| `e2e/user-journey.spec.ts` | NEW - Critical user journey tests |
| `tests/components/resume/CaseStudy.spec.ts` | NEW - Unit tests for case study component |

---

## Implementation Order (Priority)

1. **Hero CTA & Availability** - Immediate impact on Call-to-Action rating
2. **Summary Rewrite** - Quick content improvement
3. **README Badges** - Quick technical credibility
4. **Case Study Component + Data** - Major impact on Content/Copy & Competitive Edge
5. **E2E Tests** - Technical Quality proof
6. **Design Polish** - Dark mode visibility, scroll-triggered stats

---

## Verification Plan

After implementation:
1. Run `npm run test:coverage` - verify 99%+ maintained
2. Run `npm run test:e2e` - verify new E2E tests pass
3. Run `npm run dev` - visual check of all changes
4. Check mobile responsiveness for new components
5. Verify all CTAs work (mailto, WhatsApp, LinkedIn, GitHub)
6. Test dark mode toggle visibility
7. Review case study readability and design consistency

---

## User Decisions

- **Screenshots:** Not available - skip screenshot feature, focus on text-based case study
- **Case Study Display:** Inline section (always visible, no click required)
- **GitHub Link:** Keep private - use static badge only, no source code link
