import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'

type Theme = 'light' | 'dark' | 'auto'

export const useThemeStore = defineStore('theme', () => {
  const mode = useColorMode({ emitAuto: true })
  const color = ref(mode.value === 'light' ? 'black' : 'white')

  function change(theme: Theme) {
    mode.value = theme
    color.value = theme === 'light' ? 'black' : 'white'
  }

  return {
    mode,
    color,
    change,
  }
})
