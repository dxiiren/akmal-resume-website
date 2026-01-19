<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

const { isDark, toggle } = useColorMode()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Sun v-if="isDark" class="h-5 w-5 transition-transform duration-300" />
    <Moon v-else class="h-5 w-5 transition-transform duration-300" />
  </Button>
</template>
