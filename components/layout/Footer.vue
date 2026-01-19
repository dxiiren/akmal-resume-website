<script setup lang="ts">
import { Github, Linkedin, Mail, Terminal, MessageCircle, ArrowRight, FileDown } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const currentYear = new Date().getFullYear()

defineProps<{
  name: string
  linkedin?: string
  email?: string
  github?: string
  whatsapp?: string
}>()
</script>

<template>
  <footer class="border-t border-primary/10 bg-muted/30 py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center gap-8">
        <!-- Personal Quote Section -->
        <div class="max-w-2xl text-center">
          <blockquote class="text-lg text-muted-foreground italic mb-4">
            "The best code is the one that doesn't need to exist. But when it does, make it count."
          </blockquote>
          <p class="text-sm text-primary font-medium">— Akmal Suhaimi</p>
        </div>

        <!-- CTA Section -->
        <div class="flex flex-col items-center gap-4">
          <p class="text-muted-foreground text-sm">Ready to build something impactful?</p>
          <div class="flex flex-wrap justify-center gap-3">
            <Button
              as="a"
              href="mailto:mhdakmal875@gmail.com"
              size="lg"
              class="shimmer-effect group glow-crimson"
            >
              Let's Build Together
              <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              as="a"
              href="/download"
              variant="outline"
              size="lg"
              class="group border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FileDown class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Download CV
            </Button>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <!-- Social Links -->
        <div class="flex gap-4">
          <a
            v-if="linkedin"
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="LinkedIn"
          >
            <Linkedin class="h-5 w-5 transition-transform group-hover:scale-110" />
          </a>
          <a
            v-if="github"
            :href="github"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="GitHub"
          >
            <Github class="h-5 w-5 transition-transform group-hover:scale-110" />
          </a>
          <a
            v-if="whatsapp"
            :href="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:text-white hover:border-green-600"
            aria-label="WhatsApp"
          >
            <MessageCircle class="h-5 w-5 transition-transform group-hover:scale-110" />
          </a>
          <a
            v-if="email"
            :href="`mailto:${email}`"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="Email"
          >
            <Mail class="h-5 w-5 transition-transform group-hover:scale-110" />
          </a>
        </div>

        <!-- Terminal-style Copyright -->
        <div class="text-center text-sm text-muted-foreground font-mono">
          <p class="flex items-center justify-center gap-2 mb-2">
            <Terminal class="h-4 w-4 text-primary" />
            <span class="text-terminal">$</span> echo "Made with dedication and caffeine"
          </p>
          <p class="flex items-center justify-center gap-2">
            <span class="text-terminal">$</span>
            <span>&copy; {{ currentYear }} {{ name }}. All rights reserved.</span>
            <span class="text-primary animate-terminal-blink">_</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
