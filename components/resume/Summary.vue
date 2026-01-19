<script setup lang="ts">
import { ref } from 'vue'
import { Hammer, Puzzle, BookOpen, Dumbbell, Gamepad2, Book, Users } from 'lucide-vue-next'
import { Card, CardContent } from '~/components/ui/card'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { AboutMe } from '~/types/resume'

defineProps<{
  summary: string
  aboutMe?: AboutMe
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

// Icon mapping
const iconMap: Record<string, typeof Hammer> = {
  Hammer,
  Puzzle,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Book,
  Users,
}

const getIcon = (iconName: string) => iconMap[iconName] || Hammer
</script>

<template>
  <section id="about" ref="sectionRef" class="py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-8 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">About</span>
      </h2>

      <!-- Personality Pillars -->
      <div
        v-if="aboutMe?.pillars"
        class="mx-auto max-w-5xl mb-12 grid gap-6 md:grid-cols-3 opacity-0"
        :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
      >
        <Card
          v-for="(pillar, index) in aboutMe.pillars"
          :key="pillar.title"
          class="group relative overflow-hidden hover-lift border-primary/10 hover:border-primary/30 transition-all duration-300"
          :class="[`animation-delay-${(index + 1) * 100}`]"
        >
          <!-- Terminal-style header -->
          <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div class="flex gap-1.5">
              <div class="h-2 w-2 rounded-full bg-primary/50" />
              <div class="h-2 w-2 rounded-full bg-primary/30" />
              <div class="h-2 w-2 rounded-full bg-primary/20" />
            </div>
            <span class="font-mono text-xs text-muted-foreground">~/about/{{ pillar.title.toLowerCase().replace(' ', '-') }}</span>
          </div>

          <CardContent class="p-6 relative">
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div class="relative">
              <!-- Icon -->
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <component :is="getIcon(pillar.icon)" class="h-6 w-6" />
              </div>

              <!-- Title -->
              <h3 class="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {{ pillar.title }}
              </h3>

              <!-- Description -->
              <p class="text-muted-foreground leading-relaxed">
                {{ pillar.description }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Fun Facts Row -->
      <div
        v-if="aboutMe?.funFacts"
        class="mx-auto max-w-4xl opacity-0"
        :class="{ 'animate-fade-in-up animation-delay-400': isVisible }"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span class="font-mono text-sm text-muted-foreground">// when_not_coding</span>
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div
            v-for="(fact, index) in aboutMe.funFacts"
            :key="fact.text"
            class="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            :class="[`animation-delay-${(index + 5) * 100}`]"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
              <component :is="getIcon(fact.icon)" class="h-5 w-5" />
            </div>
            <p class="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {{ fact.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Summary fallback if no aboutMe data -->
      <Card
        v-if="!aboutMe"
        class="mx-auto max-w-4xl relative overflow-hidden opacity-0 hover-lift"
        :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
      >
        <CardContent class="p-8 relative">
          <p class="text-lg leading-relaxed text-muted-foreground">
            {{ summary }}
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Subtle background decoration -->
    <div class="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
  </section>
</template>
