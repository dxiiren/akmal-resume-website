<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const isMenuOpen = ref(false)

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const scrollToSection = (href: string) => {
  isMenuOpen.value = false
  const element = document.querySelector(href)
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 text-xl font-bold text-primary group">
        <img src="/favicon-32x32.png" alt="Akmal Suhaimi Logo" class="h-8 w-8 transition-transform group-hover:rotate-12" />
      </a>

      <!-- Availability Status - Desktop only -->
      <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
        <div class="h-2 w-2 rounded-full bg-green-500 status-pulse" />
        <span class="text-xs text-green-500 font-medium">Available for opportunities</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-6 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary group"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ item.label }}
          <span class="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </a>
        <ThemeToggle />
      </nav>

      <!-- Mobile: Availability + Theme + Menu -->
      <div class="flex items-center gap-2 md:hidden">
        <!-- Mobile Availability Status -->
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-full border border-green-500/30 bg-green-500/10">
          <div class="h-1.5 w-1.5 rounded-full bg-green-500 status-pulse" />
          <span class="text-[10px] text-green-500 font-medium">Available</span>
        </div>

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Mobile Menu Button -->
        <Button
          variant="ghost"
          size="icon"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </Button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav
      v-if="isMenuOpen"
      class="border-t border-primary/10 bg-background md:hidden"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col gap-4">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            @click.prevent="scrollToSection(item.href)"
          >
            <span class="text-terminal mr-2">$</span>{{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
