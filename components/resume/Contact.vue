<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Phone, Linkedin, Globe, MapPin, Github, MessageCircle, ArrowRight, Calendar } from 'lucide-vue-next'
import type { ContactInfo } from '~/types/resume'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  contact: ContactInfo
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)
</script>

<template>
  <section id="contact" ref="sectionRef" class="bg-muted/30 py-16 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Animated section title -->
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl opacity-0"
        :class="{ 'animate-fade-in-down': isVisible }"
      >
        <span class="text-gradient">Contact</span>
      </h2>

      <Card
        class="mx-auto max-w-2xl opacity-0 relative overflow-hidden"
        :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
      >
        <!-- Gradient background effect -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-600/5" />

        <CardHeader class="relative">
          <CardTitle class="text-center text-xl">Get in Touch</CardTitle>
        </CardHeader>

        <CardContent class="relative">
          <div class="grid gap-4 sm:grid-cols-2">
            <!-- Email -->
            <a
              :href="`mailto:${contact.email}`"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Mail class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">Email</p>
                <p class="font-medium transition-colors group-hover:text-primary">{{ contact.email }}</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- Phone -->
            <a
              :href="`tel:${contact.phone.replace(/\s/g, '')}`"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Phone class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">Phone</p>
                <p class="font-medium transition-colors group-hover:text-primary">{{ contact.phone }}</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- WhatsApp -->
            <a
              :href="contact.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-green-600/10 hover:border-green-500/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/20">
                <MessageCircle class="h-5 w-5 text-green-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">WhatsApp</p>
                <p class="font-medium transition-colors group-hover:text-green-600">Message me</p>
              </div>
              <ArrowRight class="h-4 w-4 text-green-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- Calendly -->
            <a
              :href="contact.calendly"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Calendar class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">Calendly</p>
                <p class="font-medium transition-colors group-hover:text-primary">Schedule a Call</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- LinkedIn -->
            <a
              :href="contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Linkedin class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">LinkedIn</p>
                <p class="font-medium transition-colors group-hover:text-primary">Connect</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- GitHub -->
            <a
              :href="contact.github"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Github class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">GitHub</p>
                <p class="font-medium transition-colors group-hover:text-primary">View Code</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>

            <!-- Website -->
            <a
              :href="contact.website"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-600/10 hover:border-primary/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Globe class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">Website</p>
                <p class="font-medium transition-colors group-hover:text-primary">Visit</p>
              </div>
              <ArrowRight class="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </a>
          </div>

          <!-- Location -->
          <div
            class="mt-6 flex items-center justify-center gap-2 text-muted-foreground opacity-0"
            :class="{ 'animate-fade-in animation-delay-400': isVisible }"
          >
            <MapPin class="h-4 w-4" />
            <span>{{ contact.location }}</span>
          </div>

          <!-- Main CTA Button -->
          <div
            class="mt-8 text-center opacity-0"
            :class="{ 'animate-fade-in-up animation-delay-500': isVisible }"
          >
            <Button
              as="a"
              :href="`mailto:${contact.email}`"
              size="lg"
              class="shimmer-effect bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90"
            >
              <Mail class="mr-2 h-4 w-4" />
              Send me an email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Background decorations -->
    <div class="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
  </section>
</template>
