<script setup lang="ts">
import { ref } from 'vue'
import { Lock, Download, AlertCircle, CheckCircle, Terminal, ArrowLeft } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'

// SEO Meta
useSeoMeta({
  title: 'Download CV - Akmal Suhaimi',
  description: 'Download Akmal Suhaimi\'s CV. Password protected.',
  robots: 'noindex, nofollow',
})

const password = ref('')
const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const downloadCV = async () => {
  if (!password.value.trim()) {
    error.value = 'Please enter the password'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/download-cv', {
      method: 'POST',
      body: { password: password.value },
      responseType: 'blob',
    })

    // Create download link
    const blob = new Blob([response as BlobPart], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Akmal_Suhaimi_CV.docx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    success.value = true
    password.value = ''
  } catch (err: any) {
    if (err.statusCode === 401) {
      error.value = 'Invalid password. Please try again.'
    } else {
      error.value = 'Failed to download. Please try again later.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    downloadCV()
  }
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Grid background pattern -->
    <div class="fixed inset-0 -z-10 grid-pattern opacity-30" />

    <!-- Animated gradient mesh background -->
    <div class="fixed inset-0 -z-10 animated-gradient-bg opacity-50" />

    <!-- Floating background orbs -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-float animation-delay-500" />
    </div>

    <div class="container mx-auto px-4 py-16 lg:py-24">
      <!-- Back button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft class="h-4 w-4" />
        <span>Back to Portfolio</span>
      </NuxtLink>

      <div class="max-w-md mx-auto">
        <Card class="relative overflow-hidden border-primary/20">
          <!-- Terminal header -->
          <div class="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
            <div class="flex gap-1.5">
              <div class="h-2.5 w-2.5 rounded-full bg-red-500" />
              <div class="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div class="h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
            <span class="font-mono text-xs text-muted-foreground">~/secure/download-cv</span>
          </div>

          <CardHeader class="text-center pb-2">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock class="h-8 w-8" />
            </div>
            <CardTitle class="text-2xl">Download CV</CardTitle>
            <CardDescription class="text-base">
              Enter the password to download my CV
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-6">
            <!-- Terminal-style prompt -->
            <div class="font-mono text-sm text-muted-foreground">
              <span class="text-terminal">$</span> authenticate --download cv<span class="text-primary animate-terminal-blink">_</span>
            </div>

            <!-- Success message -->
            <div
              v-if="success"
              class="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4"
            >
              <CheckCircle class="h-5 w-5 text-green-500 flex-shrink-0" />
              <div>
                <p class="text-sm font-medium text-green-500">Download started!</p>
                <p class="text-xs text-green-500/80">Your CV is being downloaded.</p>
              </div>
            </div>

            <!-- Error message -->
            <div
              v-if="error"
              class="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4"
            >
              <AlertCircle class="h-5 w-5 text-red-500 flex-shrink-0" />
              <p class="text-sm text-red-500">{{ error }}</p>
            </div>

            <!-- Password input -->
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium text-muted-foreground">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter password"
                  class="w-full rounded-lg border border-border bg-background px-4 py-3 pl-10 font-mono text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  :disabled="isLoading"
                  @keydown="handleKeydown"
                >
                <Terminal class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <!-- Download button -->
            <Button
              class="w-full shimmer-effect"
              size="lg"
              :disabled="isLoading || password.length === 0"
              @click="downloadCV"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
              <span v-else class="flex items-center gap-2">
                <Download class="h-4 w-4" />
                Download CV
              </span>
            </Button>

            <!-- Info text -->
            <p class="text-center text-xs text-muted-foreground">
              Don't have the password? <a href="mailto:mhdakmal875@gmail.com" class="text-primary hover:underline">Contact me</a>
            </p>
          </CardContent>
        </Card>

        <!-- Additional info -->
        <div class="mt-8 text-center">
          <p class="text-sm text-muted-foreground font-mono">
            <span class="text-terminal">$</span> echo "Secure download system"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
