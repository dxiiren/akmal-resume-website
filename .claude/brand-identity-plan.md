# Brand Identity Transformation Plan for Akmal Suhaimi

## Overview
Transform the current generic portfolio into a distinctive personal brand that screams "Backend Developer" while showcasing Akmal's personality: problem-solver, builder, workaholic with integrity.

---

## Brand Identity Summary

**Name:** Akmal Suhaimi
**Title:** Backend Engineer
**Tagline:** "I build. I solve. I don't stop."
**Colors:** Dark tech theme with bold crimson red accent
**Vibe:** Confident, Bold, Reliable, Professional

---

## Implementation Plan

### 1. Color Scheme Overhaul
**File:** `assets/css/tailwind.css`

Transform from generic blue to a bold, techy dark theme:
- **Background:** Deep dark (#0a0a0f) - like a terminal
- **Primary:** Crimson Red (#dc2626) - bold, confident, stands out
- **Accent:** Soft red (#ef4444) for highlights
- **Text:** Clean white/gray hierarchy

```css
:root {
  --background: 240 10% 4%;        /* Deep dark */
  --foreground: 0 0% 95%;          /* Clean white */
  --primary: 0 84% 60%;            /* Crimson Red */
  --accent: 0 91% 71%;             /* Soft red */
}
```

### 2. Hero Section Redesign
**File:** `components/resume/Hero.vue`

**Changes:**
- Add personal tagline: "I build. I solve. I don't stop."
- Add typing effect with multiple roles: "Backend Engineer", "Problem Solver", "System Architect"
- Add terminal-style code snippet showing personality
- Add stats counters (4+ years, 50K+ transactions/day, 99.9% uptime)

**New Elements:**
```vue
<!-- Terminal-style intro -->
<div class="terminal-window">
  > const akmal = {
    role: "Backend Engineer",
    motto: "I don't stop until it's solved",
    status: "Building scalable systems..."
  }
</div>
```

### 3. New "Who I Am" Section
**File:** `components/resume/AboutMe.vue` (NEW)

Replace or enhance Summary with personality-driven content:

**Structure:**
- **The Builder:** "I architect systems that scale"
- **The Problem Solver:** "I don't stop until bugs are crushed"
- **The Learner:** "Always growing, always curious"

**Fun Facts Grid:**
- Fitness enthusiast (shows discipline)
- Gamer (strategic thinking)
- Bookworm (continuous learner)
- Family-oriented (values integrity)

### 4. Skills Section Enhancement
**File:** `components/resume/Skills.vue`

**Changes:**
- Add skill proficiency bars/meters
- Group with icons representing backend focus
- Add "Tech Stack" terminal-style visualization
- Highlight Laravel, PHP, MySQL prominently as core stack

**Visual:**
```
┌─────────────────────────────────┐
│ $ tech-stack --primary          │
│ > Laravel ████████████ Expert   │
│ > PHP     ████████████ Expert   │
│ > MySQL   ███████████░ Advanced │
│ > AWS     ██████████░░ Advanced │
└─────────────────────────────────┘
```

### 5. Experience Section Enhancement
**File:** `components/resume/Experience.vue`

**Changes:**
- Add impact metrics prominently (95% reduction, 50K transactions, 99.9% uptime)
- Add "Key Achievement" highlight per role
- Terminal-style company headers

### 6. Projects Section Enhancement
**File:** `components/resume/Projects.vue`

**Changes:**
- Add project type badges (API, Integration, Platform)
- Add GitHub links where available
- Show tech stack more prominently
- Add "Impact" metrics

### 7. Header Enhancement
**File:** `components/layout/Header.vue`

**Changes:**
- Add terminal cursor icon
- Add availability status indicator ("Open to opportunities")
- Make navigation more prominent

### 8. Footer Enhancement
**File:** `components/layout/Footer.vue`

**Changes:**
- Add personal quote/motto
- Add "Let's build something together" CTA
- Social links with hover effects

### 9. New Animations & Effects
**File:** `tailwind.config.ts` + `assets/css/tailwind.css`

**New animations:**
- Terminal typing effect
- Code syntax highlighting colors
- Glitch effect for headings
- Matrix-style background particles (subtle)

---

## Files to Modify

| File | Changes |
|------|---------|
| `assets/css/tailwind.css` | New color scheme, terminal utilities |
| `components/resume/Hero.vue` | Tagline, typing roles, stats, terminal code |
| `components/resume/Summary.vue` | Transform to "About Me" with personality |
| `components/resume/Skills.vue` | Proficiency bars, terminal styling |
| `components/resume/Experience.vue` | Impact metrics, key achievements |
| `components/resume/Projects.vue` | Type badges, impact metrics |
| `components/layout/Header.vue` | Status indicator, terminal icon |
| `components/layout/Footer.vue` | Personal quote, CTA |
| `tailwind.config.ts` | New keyframes, animations |
| `data/resume.ts` | Add tagline, fun facts data |
| `pages/index.vue` | Update background effects |

---

## New Data to Add
**File:** `data/resume.ts`

```typescript
// Add to resumeData
tagline: "I build. I solve. I don't stop.",

aboutMe: {
  headline: "Backend Engineer who turns complex problems into elegant solutions",
  traits: [
    { icon: "code", title: "The Builder", desc: "I architect systems that scale to thousands of users" },
    { icon: "bug", title: "The Problem Solver", desc: "I don't stop until every bug is crushed" },
    { icon: "book", title: "The Learner", desc: "Always growing, always curious about new tech" },
  ],
  funFacts: [
    { icon: "dumbbell", text: "Fitness keeps my code clean" },
    { icon: "gamepad", text: "Gamer - strategic thinking helps debugging" },
    { icon: "book-open", text: "Always reading, always learning" },
    { icon: "heart", text: "Family & friends fuel my drive" },
  ]
},

stats: [
  { value: "4+", label: "Years Experience" },
  { value: "50K+", label: "Transactions/Day" },
  { value: "99.9%", label: "System Uptime" },
  { value: "85%", label: "Test Coverage" },
]
```

---

## Verification Plan

1. **Visual Check:** Run `npm run dev` and verify:
   - Dark theme applies correctly
   - Terminal elements render properly
   - Animations work smoothly
   - Mobile responsive

2. **Content Check:**
   - Tagline appears prominently
   - Fun facts display correctly
   - Stats counters animate

3. **Performance Check:**
   - Animations don't cause jank
   - Page load remains fast

4. **Accessibility Check:**
   - Color contrast meets WCAG
   - Reduced motion respected

---

## Implementation Order

1. Color scheme (foundation)
2. Hero section (first impression)
3. Resume data updates
4. Summary/AboutMe section
5. Skills enhancement
6. Experience enhancement
7. Projects enhancement
8. Header/Footer
9. Final polish & animations
