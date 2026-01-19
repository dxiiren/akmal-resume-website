import { ref, onMounted, onUnmounted } from 'vue'

interface TypewriterOptions {
  delay?: number
  initialDelay?: number
}

export function useTypewriter(text: string, options: TypewriterOptions = {}) {
  const { delay = 80, initialDelay = 500 } = options
  const displayText = ref('')
  const isComplete = ref(false)
  const showCursor = ref(true)
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let cursorIntervalId: ReturnType<typeof setInterval> | null = null

  const startTyping = () => {
    let currentIndex = 0

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        displayText.value += text[currentIndex]
        currentIndex++
        timeoutId = setTimeout(typeNextChar, delay)
      } else {
        isComplete.value = true
        // Stop cursor blinking after completion
        setTimeout(() => {
          showCursor.value = false
          if (cursorIntervalId) {
            clearInterval(cursorIntervalId)
          }
        }, 2000)
      }
    }

    timeoutId = setTimeout(typeNextChar, initialDelay)
  }

  onMounted(() => {
    startTyping()
    // Blink cursor
    cursorIntervalId = setInterval(() => {
      if (!isComplete.value) {
        showCursor.value = !showCursor.value
      }
    }, 530)
  })

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    if (cursorIntervalId) {
      clearInterval(cursorIntervalId)
    }
  })

  return { displayText, isComplete, showCursor }
}
