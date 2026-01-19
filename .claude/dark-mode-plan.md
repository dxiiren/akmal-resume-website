# Dark/Light Mode Implementation Plan

## Summary
Implement dark/light mode toggle using **VueUse's `useColorMode`** - already installed in your project via `@vueuse/core`.

**Good news:** Your CSS already has dark mode variables defined in `assets/css/tailwind.css`. We just need to add the toggle mechanism.

---

## Approach: VueUse (Recommended)

| Option | Status |
|--------|--------|
| VueUse `useColorMode` | **Recommended** - Already installed, zero new deps |
| @nuxtjs/color-mode | Requires new dependency |
| Custom composable | More code to maintain |

---

## Files to Create

### 1. `composables/useColorMode.ts`
Composable wrapping VueUse's color mode with:
- Toggle function
- localStorage persistence
- System preference detection

### 2. `components/ui/ThemeToggle.vue`
Button component with Sun/Moon icons from lucide-vue-next

---

## Files to Modify

### 1. `components/layout/Header.vue`
- Add ThemeToggle button to desktop nav (after nav links)
- Add ThemeToggle button to mobile nav (before hamburger menu)

### 2. `nuxt.config.ts`
- Add inline script to `<head>` to prevent flash of wrong theme on load

### 3. `app.vue`
- Initialize color mode at app root
- Add transition class for smooth theme switching

### 4. `assets/css/tailwind.css`
- Add `color-scheme: dark` for `.dark` class
- Add theme transition utilities

---

## Implementation Steps

1. Create `composables/useColorMode.ts` composable
2. Create `components/ui/ThemeToggle.vue` component
3. Add anti-FOUC script to `nuxt.config.ts`
4. Update `app.vue` to initialize color mode
5. Add ThemeToggle to Header.vue (desktop + mobile)
6. Add transition CSS to tailwind.css

---

## Verification

1. **Toggle works** - Click button, theme switches smoothly
2. **Persistence** - Refresh page, theme stays
3. **System preference** - Clear localStorage, respects OS setting
4. **No flash** - Page loads in correct theme without flicker
5. **Mobile** - Toggle works on mobile view

---

## Optional Enhancements (can add later)

- Three-way toggle (Light/Dark/System)
- Animated icon rotation transition
- Dynamic `theme-color` meta tag update
