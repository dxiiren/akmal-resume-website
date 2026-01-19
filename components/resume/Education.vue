<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCap, MapPin, Calendar, Award, Clock, Target, CheckCircle, ExternalLink } from 'lucide-vue-next'
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

const getStatusConfig = (status?: string) => {
  switch (status) {
    case 'ongoing':
      return { label: 'Ongoing', icon: Clock, class: 'bg-blue-500/10 text-blue-500 border-blue-500/30' }
    case 'planned':
      return { label: 'Planned', icon: Target, class: 'bg-amber-500/10 text-amber-500 border-amber-500/30' }
    case 'completed':
      return { label: 'Completed', icon: CheckCircle, class: 'bg-green-500/10 text-green-500 border-green-500/30' }
    default:
      return null
  }
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

      <div class="mx-auto max-w-3xl flex flex-col gap-6">
        <component
          :is="edu.link ? 'a' : 'div'"
          v-for="(edu, index) in education"
          :key="index"
          :href="edu.link"
          :target="edu.link ? '_blank' : undefined"
          :rel="edu.link ? 'noopener noreferrer' : undefined"
          class="block"
        >
          <Card
            class="group relative overflow-hidden opacity-0 hover-lift"
            :class="[
              { 'animate-fade-in-up': isVisible },
              { 'cursor-pointer': edu.link },
              getAnimationDelay(index)
            ]"
          >
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardHeader class="relative">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-start gap-4">
                  <!-- University Logo -->
                  <div v-if="edu.logo" class="flex-shrink-0 h-12 w-12 rounded-lg bg-white p-1.5 shadow-sm">
                    <img :src="edu.logo" :alt="edu.institution" class="h-full w-full object-contain" />
                  </div>
                  <div v-else class="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle class="flex items-center gap-2 text-xl">
                      <span class="transition-colors group-hover:text-primary">{{ edu.degree }}</span>
                      <ExternalLink v-if="edu.link" class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </CardTitle>
                    <CardDescription class="mt-2 text-base">
                      {{ edu.institution }}
                    </CardDescription>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <!-- Status badge -->
                  <Badge
                    v-if="getStatusConfig(edu.status)"
                    variant="outline"
                    :class="['flex items-center gap-1', getStatusConfig(edu.status)?.class]"
                  >
                    <component :is="getStatusConfig(edu.status)?.icon" class="h-3 w-3" />
                    {{ getStatusConfig(edu.status)?.label }}
                  </Badge>
                  <!-- CGPA badge with shimmer effect -->
                  <Badge
                    v-if="edu.cgpa"
                    class="flex items-center gap-1 shimmer-effect bg-gradient-to-r from-primary to-red-600 text-primary-foreground"
                  >
                    <Award class="h-3 w-3" />
                    CGPA: {{ edu.cgpa }}
                  </Badge>
                </div>
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
                <span v-if="edu.expectedCompletion" class="flex items-center gap-1 text-blue-500">
                  <Target class="h-4 w-4" />
                  Expected: {{ edu.expectedCompletion }}
                </span>
              </div>
            </CardContent>
          </Card>
        </component>
      </div>
    </div>

    <!-- Background decorations -->
    <div class="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>
