import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useColorMode } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const mode = useColorMode({ emitAuto: true })
  const color = computed(() => (mode.value === 'light' ? 'black' : 'white'))

  return {
    mode,
    color,
  }
})
