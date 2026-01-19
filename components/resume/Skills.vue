<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import type { SkillCategory } from '~/types/resume'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  skills: SkillCategory[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

const modules = [Pagination, FreeMode]

const getAnimationDelay = (index: number) => {
  const delays = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300', 'animation-delay-400', 'animation-delay-500', 'animation-delay-600', 'animation-delay-700', 'animation-delay-800']
  return delays[index % delays.length]
}

// Core stack skills to highlight
const coreStack = ['Laravel', 'PHP', 'MySQL']

const isCoreSKill = (skill: string) => {
  return coreStack.some(core => skill.includes(core))
}
</script>

<template>
  <section id="skills" ref="sectionRef" class="bg-muted/30 py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Terminal-style section title -->
      <div class="mb-12 text-center">
        <h2
          class="text-3xl font-bold tracking-tight lg:text-4xl opacity-0 mb-4"
          :class="{ 'animate-fade-in-down': isVisible }"
        >
          <span class="text-gradient">Skills</span>
        </h2>
        <p
          class="font-mono text-sm text-muted-foreground opacity-0"
          :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
        >
          <span class="text-terminal">$</span> cat skills.json
        </p>
      </div>

      <!-- Core Stack Highlight -->
      <div
        class="mx-auto max-w-2xl mb-12 opacity-0"
        :class="{ 'animate-fade-in-up animation-delay-300': isVisible }"
      >
        <div class="rounded-lg border border-primary/20 bg-card/50 p-6 backdrop-blur-sm">
          <div class="flex items-center gap-2 mb-4">
            <div class="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span class="font-mono text-sm text-primary">core_stack</span>
          </div>
          <div class="flex flex-wrap justify-center gap-3">
            <Badge
              v-for="skill in coreStack"
              :key="skill"
              class="bg-primary/10 text-primary border-primary/30 px-4 py-2 text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
            >
              {{ skill }}
            </Badge>
          </div>
        </div>
      </div>

      <!-- Mobile Carousel (visible on small screens) -->
      <div class="md:hidden -mx-4 px-4">
        <Swiper
          :modules="modules"
          :slides-per-view="1.15"
          :space-between="12"
          :free-mode="true"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :grab-cursor="true"
          class="skills-carousel pb-10"
        >
          <SwiperSlide v-for="category in skills" :key="category.category" class="h-auto">
            <Card class="group relative overflow-hidden h-full border-primary/10">
              <!-- Terminal header -->
              <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
                <div class="flex gap-1.5">
                  <div class="h-2 w-2 rounded-full bg-primary/50" />
                  <div class="h-2 w-2 rounded-full bg-primary/30" />
                  <div class="h-2 w-2 rounded-full bg-primary/20" />
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader class="pb-3 relative">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <div class="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <CardTitle class="text-lg">{{ category.category }}</CardTitle>
                </div>
              </CardHeader>
              <CardContent class="relative">
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="skill in category.skills"
                    :key="skill"
                    :variant="isCoreSKill(skill) ? 'default' : 'secondary'"
                    :class="[
                      'text-sm',
                      isCoreSKill(skill) ? 'bg-primary/20 text-primary border-primary/30' : ''
                    ]"
                  >
                    {{ skill }}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Desktop Grid (hidden on small screens) -->
      <div class="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(category, index) in skills"
          :key="category.category"
          class="group relative overflow-hidden opacity-0 hover-lift border-primary/10 hover:border-primary/30"
          :class="[
            { 'animate-fade-in-up': isVisible },
            getAnimationDelay(index)
          ]"
        >
          <!-- Terminal-style header -->
          <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div class="flex gap-1.5">
              <div class="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-red-500 transition-colors" />
              <div class="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-yellow-500 transition-colors" />
              <div class="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-green-500 transition-colors" />
            </div>
            <span class="font-mono text-xs text-muted-foreground">{{ category.category.toLowerCase().replace(/\s+/g, '-') }}.json</span>
          </div>

          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader class="pb-3 relative">
            <div class="flex items-center gap-3">
              <!-- Category indicator dot that expands -->
              <div class="relative">
                <div class="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:h-3 group-hover:w-3" />
                <div class="absolute inset-0 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:animate-pulse-ring" />
              </div>
              <CardTitle class="text-lg transition-colors group-hover:text-primary">{{ category.category }}</CardTitle>
            </div>
          </CardHeader>

          <CardContent class="relative">
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="(skill, skillIndex) in category.skills"
                :key="skill"
                :variant="isCoreSKill(skill) ? 'default' : 'secondary'"
                :class="[
                  'text-sm transition-all duration-200 hover:scale-105 cursor-default',
                  isCoreSKill(skill)
                    ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground'
                    : 'hover:bg-primary hover:text-primary-foreground'
                ]"
                :style="{ transitionDelay: `${skillIndex * 50}ms` }"
              >
                {{ skill }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Background decorations - crimson themed -->
    <div class="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>

<style scoped>
.skills-carousel :deep(.swiper-pagination) {
  position: relative;
  margin-top: 0.5rem;
}

.skills-carousel :deep(.swiper-pagination-bullet) {
  background: hsl(var(--primary));
  opacity: 0.3;
  transition: all 0.3s ease;
}

.skills-carousel :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.2);
}

.skills-carousel :deep(.swiper-slide) {
  height: auto;
}
</style>
