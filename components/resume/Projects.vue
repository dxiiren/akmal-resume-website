<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { FolderOpen, Calendar, ExternalLink, Zap, Link, Layers, Settings } from 'lucide-vue-next'
import type { Project } from '~/types/resume'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  projects: Project[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

const modules = [Pagination, FreeMode]

const getAnimationDelay = (index: number) => {
  const delays = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300']
  return delays[index % delays.length]
}

// Project type icons and colors
const getTypeConfig = (type?: string) => {
  const configs: Record<string, { icon: typeof Link; color: string; bg: string }> = {
    Integration: { icon: Link, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
    Platform: { icon: Layers, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30' },
    System: { icon: Settings, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  }
  return configs[type || ''] || { icon: FolderOpen, color: 'text-primary', bg: 'bg-primary/10 border-primary/30' }
}

// 3D tilt effect
const handleMouseMove = (event: MouseEvent, cardEl: HTMLElement) => {
  const rect = cardEl.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
}

const handleMouseLeave = (cardEl: HTMLElement) => {
  cardEl.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="bg-muted/30 py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">Projects</span>
      </h2>

      <!-- Mobile Carousel (visible on small screens) -->
      <div class="md:hidden -mx-4 px-4">
        <Swiper
          :modules="modules"
          :slides-per-view="1.1"
          :space-between="12"
          :free-mode="true"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :grab-cursor="true"
          class="projects-carousel pb-10"
        >
          <SwiperSlide v-for="(project, index) in projects" :key="index" class="h-auto">
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="block h-full"
              :class="{ 'cursor-pointer': project.link, 'cursor-default pointer-events-none': !project.link }"
            >
            <Card class="group relative overflow-hidden h-full border-primary/10">
              <!-- Terminal header -->
              <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
                <div class="flex gap-1.5">
                  <div class="h-2 w-2 rounded-full bg-primary/50" />
                  <div class="h-2 w-2 rounded-full bg-primary/30" />
                  <div class="h-2 w-2 rounded-full bg-primary/20" />
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardHeader class="relative">
                <div class="flex items-start justify-between gap-2">
                  <CardTitle class="flex items-center gap-2 text-base">
                    <component :is="getTypeConfig(project.type).icon" :class="['h-4 w-4 flex-shrink-0', getTypeConfig(project.type).color]" />
                    <span>{{ project.name }}</span>
                  </CardTitle>
                  <div class="flex flex-col gap-1 items-end">
                    <!-- Type Badge -->
                    <Badge v-if="project.type" :class="['flex-shrink-0 text-xs', getTypeConfig(project.type).bg, getTypeConfig(project.type).color]">
                      {{ project.type }}
                    </Badge>
                    <Badge variant="outline" class="flex-shrink-0 text-xs border-primary/30">
                      <Calendar class="mr-1 h-3 w-3" />
                      {{ project.year }}
                    </Badge>
                  </div>
                </div>

                <!-- Impact Metric -->
                <Badge v-if="project.impactMetric" class="w-fit mt-2 bg-primary/10 text-primary border-primary/30 text-xs">
                  <Zap class="h-3 w-3 mr-1" />
                  {{ project.impactMetric }}
                </Badge>

                <div class="mt-2 flex flex-wrap gap-1">
                  <Badge
                    v-for="tech in project.technologies"
                    :key="tech"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ tech }}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent class="relative">
                <ul class="space-y-2">
                  <li
                    v-for="(achievement, achIndex) in project.achievements"
                    :key="achIndex"
                    class="relative pl-4 text-sm text-muted-foreground before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary"
                  >
                    {{ achievement }}
                  </li>
                </ul>
                <!-- External link indicator -->
                <div v-if="project.link" class="absolute bottom-4 right-4">
                  <ExternalLink class="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>
            </a>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Desktop Grid (hidden on small screens) -->
      <div class="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(project, index) in projects"
          :key="index"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="block opacity-0"
          :class="[
            { 'animate-fade-in-up': isVisible, 'cursor-pointer': project.link, 'cursor-default pointer-events-none': !project.link },
            getAnimationDelay(index)
          ]"
        >
        <Card
          class="group relative flex flex-col overflow-hidden h-full gradient-border border-primary/10 hover:border-primary/30"
          style="transition: transform 0.2s ease-out"
          @mousemove="(e: MouseEvent) => handleMouseMove(e, e.currentTarget as HTMLElement)"
          @mouseleave="(e: MouseEvent) => handleMouseLeave(e.currentTarget as HTMLElement)"
        >
          <!-- Terminal-style header -->
          <div class="flex items-center justify-between gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-red-500 transition-colors" />
                <div class="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-yellow-500 transition-colors" />
                <div class="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-green-500 transition-colors" />
              </div>
              <span class="font-mono text-xs text-muted-foreground">project-{{ project.year }}.md</span>
            </div>
            <!-- Type Badge in header -->
            <Badge v-if="project.type" :class="['text-xs', getTypeConfig(project.type).bg, getTypeConfig(project.type).color]">
              <component :is="getTypeConfig(project.type).icon" class="h-3 w-3 mr-1" />
              {{ project.type }}
            </Badge>
          </div>

          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader class="relative">
            <div class="flex items-start justify-between gap-2">
              <CardTitle class="flex items-center gap-2 text-lg">
                <!-- Animated folder icon -->
                <component :is="getTypeConfig(project.type).icon" :class="['h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6', getTypeConfig(project.type).color]" />
                <span class="transition-colors group-hover:text-primary">{{ project.name }}</span>
              </CardTitle>
              <Badge variant="outline" class="flex-shrink-0 transition-colors border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                <Calendar class="mr-1 h-3 w-3" />
                {{ project.year }}
              </Badge>
            </div>

            <!-- Impact Metric Badge -->
            <Badge v-if="project.impactMetric" class="w-fit mt-2 bg-primary/10 text-primary border-primary/30 text-sm">
              <Zap class="h-3 w-3 mr-1" />
              {{ project.impactMetric }}
            </Badge>

            <!-- Technology badges with stagger animation -->
            <div class="mt-3 flex flex-wrap gap-1.5">
              <Badge
                v-for="(tech, techIndex) in project.technologies"
                :key="tech"
                variant="secondary"
                class="text-xs transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                :style="{ transitionDelay: `${techIndex * 50}ms` }"
              >
                {{ tech }}
              </Badge>
            </div>
          </CardHeader>

          <CardContent class="flex-1 relative">
            <ul class="space-y-2">
              <li
                v-for="(achievement, achIndex) in project.achievements"
                :key="achIndex"
                class="relative pl-5 text-sm text-muted-foreground transition-colors hover:text-foreground before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary before:transition-transform before:duration-200 hover:before:scale-150"
              >
                {{ achievement }}
              </li>
            </ul>

            <!-- External link indicator that fades in -->
            <div v-if="project.link" class="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ExternalLink class="h-4 w-4 text-primary" />
            </div>
          </CardContent>
        </Card>
        </a>
      </div>
    </div>

    <!-- Background decorations - crimson themed -->
    <div class="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>

<style scoped>
.projects-carousel :deep(.swiper-pagination) {
  position: relative;
  margin-top: 0.5rem;
}

.projects-carousel :deep(.swiper-pagination-bullet) {
  background: hsl(var(--primary));
  opacity: 0.3;
  transition: all 0.3s ease;
}

.projects-carousel :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.2);
}

.projects-carousel :deep(.swiper-slide) {
  height: auto;
}
</style>
