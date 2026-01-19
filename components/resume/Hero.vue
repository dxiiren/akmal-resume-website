<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Globe, Github, MessageCircle, Terminal } from 'lucide-vue-next'
import type { ContactInfo, Stat, TerminalSnippet } from '~/types/resume'
import { Button } from '~/components/ui/button'
import { useTypewriter } from '~/composables/useTypewriter'

const props = defineProps<{
  contact: ContactInfo
  tagline?: string
  roles?: string[]
  stats?: Stat[]
  terminalSnippet?: TerminalSnippet
}>()

const { displayText, showCursor } = useTypewriter(props.contact.name, { delay: 100, initialDelay: 300 })

const isLoaded = ref(false)
const showContent = ref(false)
const currentRoleIndex = ref(0)

// Rotating roles typewriter effect
const currentRole = computed(() => props.roles?.[currentRoleIndex.value] || props.contact.title)

onMounted(() => {
  isLoaded.value = true
  setTimeout(() => {
    showContent.value = true
  }, 200)

  // Rotate roles every 3 seconds
  if (props.roles && props.roles.length > 1) {
    setInterval(() => {
      currentRoleIndex.value = (currentRoleIndex.value + 1) % props.roles!.length
    }, 3000)
  }
})

// Animate counter
const animatedStats = ref<{ [key: number]: string }>({})
const animateCounter = (index: number, targetValue: string) => {
  const numericPart = targetValue.replace(/[^0-9.]/g, '')
  const isDecimal = numericPart.includes('.')
  const target = parseFloat(numericPart)
  // Check if suffix comes after the number (like "50K") or before
  const numericIndex = targetValue.search(/[0-9]/)
  const suffix = targetValue.slice(numericPart.length + numericIndex).replace(/[+%]/g, '')
  let current = 0
  const increment = target / 30
  const interval = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(interval)
    }
    animatedStats.value[index] = (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix
  }, 50)
}

onMounted(() => {
  props.stats?.forEach((stat, index) => {
    setTimeout(() => {
      animateCounter(index, stat.value)
    }, index * 200)
  })
})
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        <!-- Profile Image with animated crimson glow -->
        <div
          class="relative"
          :class="isLoaded ? 'animate-scale-in' : 'opacity-0'"
        >
          <!-- Animated glow ring - crimson -->
          <div class="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-red-400 to-primary opacity-75 blur-xl animate-pulse-glow" />

          <!-- Secondary glow - crimson -->
          <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-red-600 opacity-50 blur-lg animate-spin-slow" />

          <img
            :src="contact.image"
            :alt="contact.name"
            class="relative h-48 w-48 rounded-full border-4 border-background object-cover shadow-2xl lg:h-64 lg:w-64 transition-transform duration-300 hover:scale-105"
          >

          <!-- Terminal indicator -->
          <div class="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg animate-bounce-subtle glow-crimson">
            <Terminal class="h-5 w-5" />
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 text-center lg:text-left">
          <!-- Typewriter Name -->
          <h1 class="mb-2 text-4xl font-bold tracking-tight lg:text-6xl">
            <span class="text-gradient">{{ displayText }}</span>
            <span
              v-if="showCursor"
              class="text-primary animate-typing-cursor"
            >|</span>
          </h1>

          <!-- Bold Tagline with neon glow -->
          <p
            v-if="tagline"
            class="mb-4 text-xl lg:text-2xl font-bold neon-glow"
            :class="showContent ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'"
          >
            {{ tagline }}
          </p>

          <!-- Rotating Role Typewriter -->
          <div
            class="relative mb-6 inline-block"
            :class="showContent ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'"
          >
            <p class="text-lg text-muted-foreground lg:text-xl font-medium font-mono">
              <span class="text-terminal">$</span> {{ currentRole }}<span class="text-primary animate-terminal-blink">_</span>
            </p>
            <!-- Animated underline -->
            <div
              class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-red-400 transition-all duration-700"
              :class="showContent ? 'w-full' : 'w-0'"
            />
          </div>

          <!-- Stats Grid -->
          <div
            v-if="stats && stats.length > 0"
            class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
            :class="showContent ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div class="relative">
                <p class="text-2xl font-bold text-primary lg:text-3xl">
                  {{ animatedStats[index] || '0' }}<span class="text-lg">{{ stat.suffix }}</span>
                </p>
                <p class="text-xs text-muted-foreground lg:text-sm">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Info with staggered animation -->
          <div
            class="mb-8 flex flex-wrap items-center justify-center gap-4 text-muted-foreground lg:justify-start"
            :class="showContent ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'"
          >
            <span class="flex items-center gap-2 transition-colors hover:text-primary">
              <MapPin class="h-4 w-4" />
              {{ contact.location }}
            </span>
            <span class="flex items-center gap-2 transition-colors hover:text-primary">
              <Mail class="h-4 w-4" />
              {{ contact.email }}
            </span>
            <span class="flex items-center gap-2 transition-colors hover:text-primary">
              <Phone class="h-4 w-4" />
              {{ contact.phone }}
            </span>
          </div>

          <!-- CTA Buttons with animations -->
          <div
            class="flex flex-wrap justify-center gap-3 lg:justify-start"
            :class="showContent ? 'animate-fade-in-up animation-delay-700' : 'opacity-0'"
          >
            <!-- Primary CTA - Email -->
            <Button
              as="a"
              :href="`mailto:${contact.email}`"
              size="lg"
              class="shimmer-effect group"
            >
              <Mail class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Get in Touch
            </Button>

            <!-- WhatsApp -->
            <Button
              as="a"
              :href="contact.whatsapp"
              target="_blank"
              size="lg"
              class="bg-green-600 hover:bg-green-700 shimmer-effect group"
            >
              <MessageCircle class="mr-2 h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              WhatsApp
            </Button>

            <!-- LinkedIn -->
            <Button
              as="a"
              :href="contact.linkedin"
              target="_blank"
              variant="outline"
              size="lg"
              class="group"
            >
              <Linkedin class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              LinkedIn
            </Button>

            <!-- GitHub -->
            <Button
              as="a"
              :href="contact.github"
              target="_blank"
              variant="outline"
              size="lg"
              class="group"
            >
              <Github class="mr-2 h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              GitHub
            </Button>

            <!-- Website -->
            <Button
              as="a"
              :href="contact.website"
              target="_blank"
              variant="ghost"
              size="lg"
              class="group"
            >
              <Globe class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Website
            </Button>
          </div>
        </div>
      </div>

      <!-- Terminal Code Snippet -->
      <div
        v-if="terminalSnippet"
        class="mx-auto mt-12 max-w-2xl"
        :class="showContent ? 'animate-fade-in-up animation-delay-800' : 'opacity-0'"
      >
        <div class="overflow-hidden rounded-lg border border-primary/20 bg-[#0a0a0f] shadow-2xl glow-crimson">
          <!-- Terminal Header -->
          <div class="flex items-center gap-2 border-b border-primary/20 bg-[#0f0f15] px-4 py-3">
            <div class="flex gap-2">
              <div class="h-3 w-3 rounded-full bg-red-500" />
              <div class="h-3 w-3 rounded-full bg-yellow-500" />
              <div class="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span class="ml-2 font-mono text-xs text-muted-foreground">AkmalSuhaimi.php</span>
          </div>
          <!-- Code Content -->
          <pre class="overflow-x-auto p-4 font-mono text-sm leading-relaxed"><code class="text-terminal">{{ terminalSnippet.code }}</code></pre>
        </div>
      </div>
    </div>

    <!-- Decorative Floating Orbs - Crimson themed -->
    <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float" />
    <div class="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl animate-float animation-delay-500" />
    <div class="absolute right-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/5 blur-2xl animate-pulse-glow animation-delay-300" />
  </section>
</template>
