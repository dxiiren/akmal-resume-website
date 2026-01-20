<script setup lang="ts">
import { ref } from 'vue'
import { Quote, Calendar, Linkedin, User } from 'lucide-vue-next'
import type { Testimonial } from '~/types/resume'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  testimonials: Testimonial[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)

// Get initials from author name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <section id="testimonials" ref="sectionRef" class="bg-muted/30 py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Terminal-style section title -->
      <div class="mb-12 text-center">
        <h2
          class="text-3xl font-bold tracking-tight lg:text-4xl opacity-0 mb-4"
          :class="{ 'animate-fade-in-down': isVisible }"
        >
          <span class="text-gradient">Testimonials</span>
        </h2>
        <p
          class="font-mono text-sm text-muted-foreground opacity-0"
          :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
        >
          <span class="text-terminal">$</span> cat recommendations.txt
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="mx-auto max-w-4xl">
        <div v-if="testimonials && testimonials.length > 0" class="grid gap-6">
          <Card
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="group relative overflow-hidden opacity-0 border-primary/10 hover:border-primary/30"
            :class="{ 'animate-fade-in-up animation-delay-300': isVisible }"
          >
            <!-- Terminal header -->
            <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
              <div class="flex gap-1.5">
                <div class="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-red-500 transition-colors" />
                <div class="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-yellow-500 transition-colors" />
                <div class="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-green-500 transition-colors" />
              </div>
              <span class="font-mono text-xs text-muted-foreground">testimonial-{{ index + 1 }}.md</span>
            </div>

            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent class="relative p-6 lg:p-8">
              <!-- Quote icon -->
              <Quote class="h-8 w-8 text-primary/20 mb-4" />

              <!-- Quote text -->
              <blockquote class="text-muted-foreground leading-relaxed mb-6 text-sm lg:text-base">
                "{{ testimonial.quote }}"
              </blockquote>

              <!-- Author section -->
              <div class="flex items-center gap-4">
                <!-- Avatar -->
                <div v-if="testimonial.image" class="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img :src="testimonial.image" :alt="testimonial.author" class="h-full w-full object-cover" />
                </div>
                <div v-else class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                  <span class="text-sm font-semibold text-primary">{{ getInitials(testimonial.author) }}</span>
                </div>

                <!-- Author info -->
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <p class="font-semibold text-foreground">{{ testimonial.author }}</p>
                    <a
                      v-if="testimonial.linkedinUrl"
                      :href="testimonial.linkedinUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Linkedin class="h-4 w-4" />
                      <span class="sr-only">LinkedIn profile</span>
                    </a>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <Badge v-if="testimonial.relationship" variant="outline" class="text-xs border-primary/30">
                      <User class="h-3 w-3 mr-1" />
                      {{ testimonial.relationship }}
                    </Badge>
                    <Badge v-if="testimonial.date" variant="outline" class="text-xs border-primary/30">
                      <Calendar class="h-3 w-3 mr-1" />
                      {{ testimonial.date }}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center text-muted-foreground py-12">
          <Quote class="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No testimonials available yet.</p>
        </div>
      </div>
    </div>

    <!-- Background decorations - crimson themed -->
    <div class="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>
