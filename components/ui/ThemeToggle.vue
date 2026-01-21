<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const { isDark, toggle } = useColorMode()
</script>

<template>
  <div class="relative group">
    <Button
      variant="outline"
      size="icon"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      class="border-primary/30 hover:border-primary hover:bg-primary/10"
      @click="toggle"
    >
      <Sun v-if="isDark" class="h-5 w-5 text-yellow-500 transition-transform duration-300 group-hover:rotate-45" />
      <Moon v-else class="h-5 w-5 text-primary transition-transform duration-300 group-hover:-rotate-12" />
    </Button>
    <!-- Tooltip -->
    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
      {{ isDark ? 'Light mode' : 'Dark mode' }}
    </span>
  </div>
</template>
