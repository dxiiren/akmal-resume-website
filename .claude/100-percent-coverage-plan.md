# Plan: Achieve 100% Test Coverage

## Current Coverage Summary
- **Overall**: 99.71% statements, 97.8% branch, 100% functions, 99.71% lines
- **Goal**: 100% coverage across all metrics

## Coverage Gaps Identified

| File | Current Coverage | Uncovered Lines | Issue |
|------|-----------------|-----------------|-------|
| `Hero.vue` | 98.73% lines, 97.72% branch | 64-66 | Counter animation completion branch |
| `Projects.vue` | 100% lines, 92.3% branch | 35 | Fallback config for invalid/missing type |
| `Summary.vue` | 100% lines, 83.33% branch | 27 | Fallback icon for invalid iconName |
| `useScrollAnimation.ts` | 94.11% lines, 92.3% branch | 41-42 | Observer unobserve cleanup |

---

## Task 1: Fix Hero.vue Coverage (Lines 64-66)

**File to modify**: `tests/components/Hero.spec.ts`

**Problem**: Counter animation completion branch never reached - tests only wait 500ms but animation takes ~1500ms (30 increments × 50ms).

**Uncovered code**:
```typescript
if (current >= target) {
  current = target        // line 64
  clearInterval(interval) // line 65
}                         // line 66
```

**Solution**: Add test that waits for animation to complete and verifies final value:
```typescript
it('completes stats counter animation and shows final value', async () => {
  const wrapper = await mountSuspended(Hero, {
    props: { contact: mockContact, stats: mockStats },
  })
  // Wait for full animation cycle (30 increments × 50ms = 1500ms + buffer)
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Verify final animated values match targets
  const statElements = wrapper.findAll('[data-testid="stat-value"]') // or appropriate selector
  // Assert final values are correct
})
```

---

## Task 2: Fix Projects.vue Coverage (Line 35)

**File to modify**: `tests/components/Projects.spec.ts`

**Problem**: Fallback config for `getTypeConfig` function not tested when type is undefined/invalid.

**Uncovered branch**:
```typescript
return configs[type || ''] || { icon: FolderOpen, color: 'text-primary', bg: 'bg-primary/10 border-primary/30' }
```

**Solution**: Add tests for projects with undefined/invalid type:
```typescript
it('renders project with undefined type using fallback config', async () => {
  const projectWithoutType = { ...mockProject, type: undefined }
  const wrapper = await mountSuspended(Projects, {
    props: { projects: [projectWithoutType] },
  })
  // Verify fallback styling/icon is applied
})

it('renders project with unknown type using fallback config', async () => {
  const projectWithUnknownType = { ...mockProject, type: 'CustomType' }
  const wrapper = await mountSuspended(Projects, {
    props: { projects: [projectWithUnknownType] },
  })
  // Verify FolderOpen icon and primary color styling
})
```

---

## Task 3: Fix Summary.vue Coverage (Line 27)

**File to modify**: `tests/components/Summary.spec.ts` (or create if needed)

**Problem**: Fallback icon (Hammer) not tested when iconName is invalid.

**Uncovered branch**:
```typescript
const getIcon = (iconName: string) => iconMap[iconName] || Hammer
```

**Solution**: Add tests with invalid icon names:
```typescript
it('uses Hammer fallback icon for invalid icon names in pillars', async () => {
  const aboutMeWithInvalidIcon = {
    pillars: [{ icon: 'InvalidIconName', title: 'Test', description: 'Test' }],
  }
  const wrapper = await mountSuspended(Summary, {
    props: { summary: 'Test', aboutMe: aboutMeWithInvalidIcon },
  })
  // Verify component renders without errors
  // Verify fallback icon is used
})

it('uses Hammer fallback icon for invalid icon names in funFacts', async () => {
  const aboutMeWithInvalidFunFact = {
    funFacts: [{ icon: 'UnknownIcon', text: 'Test fact' }],
  }
  const wrapper = await mountSuspended(Summary, {
    props: { summary: 'Test', aboutMe: aboutMeWithInvalidFunFact },
  })
  // Verify component renders and uses fallback
})
```

---

## Task 4: Fix useScrollAnimation.ts Coverage (Lines 41-42)

**File to modify**: `tests/composables/useScrollAnimation.spec.ts` (or create if needed)

**Problem**: Observer cleanup in `onUnmounted` hook not verified.

**Uncovered code**:
```typescript
onUnmounted(() => {
  if (observer && targetRef.value) {
    observer.unobserve(targetRef.value) // lines 41-42
  }
})
```

**Solution**: Add test that verifies unobserve is called during unmount:
```typescript
it('calls unobserve on the observer during unmount when element exists', async () => {
  const TestComponent = createTestComponent()
  const wrapper = mount(TestComponent)
  const observer = MockIntersectionObserver.instances[0]

  // Spy on unobserve method
  const unobserveSpy = vi.spyOn(observer, 'unobserve')

  wrapper.unmount()

  expect(unobserveSpy).toHaveBeenCalled()
})
```

---

## Implementation Order

1. **Task 2: Projects.vue** - Simplest fix, just add edge case test
2. **Task 3: Summary.vue** - Add tests for invalid icon fallback
3. **Task 4: useScrollAnimation.ts** - Add spy verification for cleanup
4. **Task 1: Hero.vue** - Most complex, requires longer wait time for animation

---

## Verification

After implementing all changes, run:
```bash
npm run test:coverage
```

Expected result:
```
All files                |   100 |   100 |   100 |   100 |
```

All statement, branch, function, and line coverage should reach 100%.
