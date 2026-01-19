<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-vue-next'
import type { Education } from '~/types/resume'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  education: Education[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

const getAnimationDelay = (index: number) => {
  const delays = ['animation-delay-100', 'animation-delay-300']
  return delays[index % delays.length]
}
</script>

<template>
  <section id="education" ref="sectionRef" class="py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">Education</span>
      </h2>

      <div class="mx-auto max-w-3xl space-y-6">
        <Card
          v-for="(edu, index) in education"
          :key="index"
          class="group relative overflow-hidden opacity-0 hover-lift"
          :class="[
            { 'animate-fade-in-up': isVisible },
            getAnimationDelay(index)
          ]"
        >
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader class="relative">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle class="flex items-center gap-2 text-xl">
                  <!-- Animated graduation cap -->
                  <GraduationCap class="h-5 w-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  <span class="transition-colors group-hover:text-primary">{{ edu.degree }}</span>
                </CardTitle>
                <CardDescription class="mt-2 text-base">
                  {{ edu.institution }}
                </CardDescription>
              </div>

              <!-- CGPA badge with shimmer effect -->
              <Badge
                v-if="edu.cgpa"
                class="flex items-center gap-1 shimmer-effect bg-gradient-to-r from-primary to-red-600 text-primary-foreground"
              >
                <Award class="h-3 w-3" />
                CGPA: {{ edu.cgpa }}
              </Badge>
            </div>
          </CardHeader>

          <CardContent class="relative">
            <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span class="flex items-center gap-1 transition-colors hover:text-primary">
                <MapPin class="h-4 w-4" />
                {{ edu.location }}
              </span>
              <span class="flex items-center gap-1 transition-colors hover:text-primary">
                <Calendar class="h-4 w-4" />
                {{ edu.period }}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Background decorations -->
    <div class="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>
