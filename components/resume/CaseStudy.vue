<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, Lightbulb, Code2, CheckCircle2, Zap } from 'lucide-vue-next'
import type { Project } from '~/types/resume'
import { Badge } from '~/components/ui/badge'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  project: Project
}>()

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef)
</script>

<template>
  <div
    ref="sectionRef"
    class="mb-12 opacity-0"
    :class="{ 'animate-fade-in-up': isVisible }"
  >
    <!-- Featured Case Study Header -->
    <div class="flex items-center gap-3 mb-6">
      <Badge class="bg-primary/10 text-primary border-primary/30 text-sm px-3 py-1">
        <Zap class="h-4 w-4 mr-1" />
        Featured Case Study
      </Badge>
      <h3 class="text-xl lg:text-2xl font-bold text-foreground">
        {{ project.name }}
      </h3>
    </div>

    <!-- Case Study Card -->
    <div class="overflow-hidden rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm">
      <!-- Terminal Header -->
      <div class="flex items-center gap-2 border-b border-primary/20 bg-[#0a0a0f] px-4 py-3">
        <div class="flex gap-2">
          <div class="h-3 w-3 rounded-full bg-red-500" />
          <div class="h-3 w-3 rounded-full bg-yellow-500" />
          <div class="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span class="ml-2 font-mono text-xs text-muted-foreground">case-study.md</span>
      </div>

      <div class="p-6 lg:p-8 space-y-6">
        <!-- Problem Statement -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-red-400">
            <AlertCircle class="h-5 w-5" />
            <h4 class="font-semibold text-lg">The Problem</h4>
          </div>
          <p class="text-muted-foreground pl-7">
            {{ project.caseStudy?.problem }}
          </p>
        </div>

        <!-- Approach -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-amber-400">
            <Lightbulb class="h-5 w-5" />
            <h4 class="font-semibold text-lg">The Approach</h4>
          </div>
          <p class="text-muted-foreground pl-7">
            {{ project.caseStudy?.approach }}
          </p>
        </div>

        <!-- Code Snippet -->
        <div v-if="project.caseStudy?.codeSnippet" class="space-y-2">
          <div class="flex items-center gap-2 text-blue-400">
            <Code2 class="h-5 w-5" />
            <h4 class="font-semibold text-lg">The Solution</h4>
          </div>
          <p class="text-muted-foreground pl-7 mb-3">
            {{ project.caseStudy?.solution }}
          </p>
          <div class="overflow-hidden rounded-lg border border-primary/10 bg-[#0a0a0f]">
            <div class="flex items-center gap-2 border-b border-primary/10 bg-[#0f0f15] px-3 py-2">
              <span class="font-mono text-xs text-muted-foreground">{{ project.caseStudy.codeSnippet.language }}</span>
            </div>
            <pre class="overflow-x-auto p-4 font-mono text-sm leading-relaxed"><code class="text-terminal">{{ project.caseStudy.codeSnippet.code }}</code></pre>
          </div>
        </div>

        <!-- Results -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-green-400">
            <CheckCircle2 class="h-5 w-5" />
            <h4 class="font-semibold text-lg">The Results</h4>
          </div>
          <ul class="grid gap-2 sm:grid-cols-2 pl-7">
            <li
              v-for="(result, index) in project.caseStudy?.results"
              :key="index"
              class="flex items-start gap-2 text-muted-foreground"
            >
              <Zap class="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{{ result }}</span>
            </li>
          </ul>
        </div>

        <!-- Technologies Used -->
        <div class="pt-4 border-t border-border/50">
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="tech in project.technologies"
              :key="tech"
              variant="secondary"
              class="text-xs"
            >
              {{ tech }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
