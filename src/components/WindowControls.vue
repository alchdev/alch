<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/theme'

import { PhRectangle, PhCards, PhMinus, PhX } from '@phosphor-icons/vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { onMounted, onUnmounted, ref } from 'vue'

const theme = useThemeStore()
const appWindow = getCurrentWindow()
const isMaximized = ref(false)

const unlistenPromise = appWindow.onResized(async () => {
  isMaximized.value = await appWindow.isMaximized()
})

onMounted(async () => {
  isMaximized.value = await appWindow.isMaximized()
})

onUnmounted(async () => {
  const unlisten = await unlistenPromise
  unlisten()
})
</script>

<template>
  <div class="ml-auto">
    <Button variant="ghost" size="icon" @click="appWindow.minimize()">
      <PhMinus :color="theme.color" />
    </Button>
    <Button variant="ghost" size="icon" @click="appWindow.toggleMaximize()">
      <PhCards v-if="isMaximized" :color="theme.color" />
      <PhRectangle v-else :color="theme.color" />
    </Button>
    <Button variant="ghost" size="icon" @click="appWindow.close()">
      <PhX :color="theme.color" />
    </Button>
  </div>
</template>
