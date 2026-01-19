<script setup lang="ts">
import { ref } from 'vue'
import { Award, Calendar, CheckCircle, ExternalLink } from 'lucide-vue-next'
import type { Certification } from '~/types/resume'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  certifications: Certification[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

const getAnimationDelay = (index: number) => {
  const delays = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300', 'animation-delay-400', 'animation-delay-500']
  return delays[index % delays.length]
}
</script>

<template>
  <section id="certifications" ref="sectionRef" class="py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">Certifications & Training</span>
      </h2>

      <!-- Mobile List (visible on small screens) -->
      <div class="sm:hidden space-y-3">
        <component
          :is="cert.link ? 'a' : 'div'"
          v-for="(cert, index) in certifications"
          :key="index"
          :href="cert.link"
          :target="cert.link ? '_blank' : undefined"
          :rel="cert.link ? 'noopener noreferrer' : undefined"
        >
          <Card
            class="group relative overflow-hidden opacity-0"
            :class="[
              { 'animate-scale-in': isVisible },
              { 'cursor-pointer': cert.link },
              getAnimationDelay(index)
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardHeader class="pb-3 relative">
              <div class="flex items-start gap-3">
                <!-- Provider Logo or Award icon -->
                <div v-if="cert.logo" class="flex-shrink-0 h-10 w-10 rounded-lg bg-white p-1.5 shadow-sm">
                  <img :src="cert.logo" :alt="cert.provider" class="h-full w-full object-contain" />
                </div>
                <div v-else class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Award class="h-5 w-5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <CardTitle class="text-sm leading-tight flex items-center gap-2">
                    {{ cert.name }}
                    <ExternalLink v-if="cert.link" class="h-3 w-3 text-muted-foreground" />
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent class="pt-0 relative">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs text-muted-foreground truncate">{{ cert.provider }}</span>
                <Badge variant="outline" class="flex items-center gap-1 flex-shrink-0 text-xs">
                  <Calendar class="h-3 w-3" />
                  {{ cert.year }}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </component>
      </div>

      <!-- Desktop/Tablet Grid (hidden on mobile) -->
      <div class="hidden sm:block mx-auto max-w-4xl">
        <div class="grid gap-4 sm:grid-cols-2">
          <component
            :is="cert.link ? 'a' : 'div'"
            v-for="(cert, index) in certifications"
            :key="index"
            :href="cert.link"
            :target="cert.link ? '_blank' : undefined"
            :rel="cert.link ? 'noopener noreferrer' : undefined"
          >
            <Card
              class="group relative overflow-hidden opacity-0 hover-lift h-full"
              :class="[
                { 'animate-scale-in': isVisible },
                { 'cursor-pointer': cert.link },
                getAnimationDelay(index)
              ]"
            >
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardHeader class="pb-3 relative">
                <div class="flex items-start gap-3">
                  <!-- Provider Logo or Award icon -->
                  <div v-if="cert.logo" class="relative flex-shrink-0 h-12 w-12 rounded-lg bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:scale-110">
                    <img :src="cert.logo" :alt="cert.provider" class="h-full w-full object-contain" />
                    <CheckCircle class="absolute -right-1 -top-1 h-4 w-4 text-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div v-else class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Award class="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    <CheckCircle class="absolute -right-1 -top-1 h-4 w-4 text-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div class="flex-1">
                    <CardTitle class="text-base leading-tight transition-colors group-hover:text-primary flex items-center gap-2">
                      {{ cert.name }}
                      <ExternalLink v-if="cert.link" class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent class="pt-0 relative">
                <div class="ml-13 flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">{{ cert.provider }}</span>
                  <!-- Year badge with color transition -->
                  <Badge
                    variant="outline"
                    class="flex items-center gap-1 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Calendar class="h-3 w-3" />
                    {{ cert.year }}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </component>
        </div>
      </div>
    </div>

    <!-- Background decorations -->
    <div class="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>

