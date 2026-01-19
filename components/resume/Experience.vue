<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { Briefcase, MapPin, Calendar, ChevronRight, Zap } from 'lucide-vue-next'
import type { Experience } from '~/types/resume'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  experience: Experience[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

const modules = [Pagination, FreeMode]

const getAnimationDelay = (index: number) => {
  const delays = ['animation-delay-200', 'animation-delay-300', 'animation-delay-400', 'animation-delay-500']
  return delays[index % delays.length]
}

const getTerminalPath = (company: string) => {
  return `~/career/${company.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`
}
</script>

<template>
  <section id="experience" ref="sectionRef" class="py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">Experience</span>
      </h2>

      <!-- Mobile Carousel (visible on small screens) -->
      <div class="md:hidden -mx-4 px-4">
        <Swiper
          :modules="modules"
          :slides-per-view="1.05"
          :space-between="12"
          :free-mode="true"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :grab-cursor="true"
          class="experience-carousel pb-10"
        >
          <SwiperSlide v-for="(job, index) in experience" :key="index" class="h-auto">
            <Card class="group relative overflow-hidden h-full border-primary/10">
              <!-- Terminal header -->
              <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
                <div class="flex gap-1.5">
                  <div class="h-2 w-2 rounded-full bg-primary/50" />
                  <div class="h-2 w-2 rounded-full bg-primary/30" />
                  <div class="h-2 w-2 rounded-full bg-primary/20" />
                </div>
                <span class="font-mono text-xs text-muted-foreground truncate">{{ getTerminalPath(job.company) }}</span>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardHeader class="relative">
                <div class="flex flex-col gap-2">
                  <div class="flex items-start justify-between gap-2">
                    <CardTitle class="text-lg leading-tight">{{ job.title }}</CardTitle>
                    <Badge variant="outline" class="flex-shrink-0 text-xs border-primary/30">
                      {{ job.workMode }}
                    </Badge>
                  </div>
                  <CardDescription class="flex items-center gap-2 text-sm">
                    <Briefcase class="h-3 w-3" />
                    {{ job.company }}
                  </CardDescription>
                  <!-- Impact Metric Badge -->
                  <Badge v-if="job.impactMetric" class="w-fit bg-primary/10 text-primary border-primary/30 text-xs">
                    <Zap class="h-3 w-3 mr-1" />
                    {{ job.impactMetric }}
                  </Badge>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <Calendar class="h-3 w-3" />
                      {{ job.period }}
                    </span>
                    <span class="flex items-center gap-1">
                      <MapPin class="h-3 w-3" />
                      {{ job.location }}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent class="relative">
                <ul class="space-y-2">
                  <li
                    v-for="(achievement, achIndex) in job.achievements.slice(0, 2)"
                    :key="achIndex"
                    class="relative pl-5 text-sm text-muted-foreground"
                  >
                    <ChevronRight class="absolute left-0 top-0.5 h-4 w-4 text-primary" />
                    {{ achievement }}
                  </li>
                  <li v-if="job.achievements.length > 2" class="text-xs text-primary font-medium pl-5">
                    +{{ job.achievements.length - 2 }} more achievements
                  </li>
                </ul>
              </CardContent>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Desktop Timeline (hidden on small screens) -->
      <div class="hidden md:block mx-auto max-w-4xl relative">
        <!-- Animated timeline line - crimson gradient -->
        <div
          class="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-red-400 to-primary/30 transition-all duration-1000 ease-out"
          :class="isVisible ? 'h-full opacity-100' : 'h-0 opacity-0'"
          style="transition-delay: 200ms"
        />

        <div class="space-y-8">
          <Card
            v-for="(job, index) in experience"
            :key="index"
            class="group relative overflow-hidden opacity-0 hover-lift ml-4 border-primary/10 hover:border-primary/30"
            :class="[
              { 'animate-fade-in-right': isVisible },
              getAnimationDelay(index)
            ]"
          >
            <!-- Terminal-style header -->
            <div class="flex items-center justify-between gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
              <div class="flex items-center gap-2">
                <div class="flex gap-1.5">
                  <div class="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-red-500 transition-colors" />
                  <div class="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-yellow-500 transition-colors" />
                  <div class="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-green-500 transition-colors" />
                </div>
                <span class="font-mono text-xs text-muted-foreground">{{ getTerminalPath(job.company) }}</span>
              </div>
              <!-- Impact Metric Badge in header -->
              <Badge v-if="job.impactMetric" class="bg-primary/10 text-primary border-primary/30 text-xs">
                <Zap class="h-3 w-3 mr-1" />
                {{ job.impactMetric }}
              </Badge>
            </div>

            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <!-- Timeline dot with pulse -->
            <div class="absolute -left-[1.35rem] top-8 z-10">
              <div class="relative">
                <div class="h-5 w-5 rounded-full border-4 border-primary bg-background transition-transform duration-300 group-hover:scale-125" />
                <!-- Pulse ring animation -->
                <div
                  class="absolute inset-0 rounded-full bg-primary opacity-0 transition-opacity duration-300"
                  :class="{ 'animate-pulse-ring': isVisible }"
                  :style="{ animationDelay: `${index * 200 + 500}ms` }"
                />
              </div>
            </div>

            <CardHeader class="pl-8 relative">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle class="text-xl transition-colors group-hover:text-primary">{{ job.title }}</CardTitle>
                  <CardDescription class="mt-1 flex items-center gap-2 text-base">
                    <Briefcase class="h-4 w-4 transition-transform group-hover:scale-110" />
                    {{ job.company }}
                  </CardDescription>
                </div>
                <div class="flex flex-col items-end gap-1 text-sm text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <Calendar class="h-4 w-4" />
                    {{ job.period }}
                  </span>
                  <!-- Work mode badge with hover effect -->
                  <Badge
                    variant="outline"
                    class="transition-all duration-300 border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                  >
                    {{ job.workMode }}
                  </Badge>
                </div>
              </div>
              <div class="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin class="h-4 w-4" />
                {{ job.location }}
                <span v-if="job.duration" class="ml-2 text-primary font-medium">
                  ({{ job.duration }})
                </span>
              </div>
            </CardHeader>

            <CardContent class="pl-8 relative">
              <ul class="space-y-3">
                <li
                  v-for="(achievement, achIndex) in job.achievements"
                  :key="achIndex"
                  class="group/item relative pl-6 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <!-- Animated chevron bullet -->
                  <ChevronRight
                    class="absolute left-0 top-1 h-4 w-4 text-primary transition-transform duration-200 group-hover/item:translate-x-1"
                  />
                  {{ achievement }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Background decorations - crimson themed -->
    <div class="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -right-32 bottom-1/3 h-96 w-96 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>

<style scoped>
.experience-carousel :deep(.swiper-pagination) {
  position: relative;
  margin-top: 0.5rem;
}

.experience-carousel :deep(.swiper-pagination-bullet) {
  background: hsl(var(--primary));
  opacity: 0.3;
  transition: all 0.3s ease;
}

.experience-carousel :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.2);
}

.experience-carousel :deep(.swiper-slide) {
  height: auto;
}
</style>
