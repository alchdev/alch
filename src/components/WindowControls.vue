<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { PhRectangle, PhCards, PhMinus, PhX } from '@phosphor-icons/vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { useColorMode } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const mode = useColorMode({ emitAuto: true })
const color = ref(mode.valueOf() === 'light' ? 'black' : 'white')
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
      <PhMinus :color="color" />
    </Button>
    <Button variant="ghost" size="icon" @click="appWindow.toggleMaximize()">
      <PhCards v-if="isMaximized" :color="color" />
      <PhRectangle v-else :color="color" />
    </Button>
    <Button variant="ghost" size="icon" @click="appWindow.close()">
      <PhX :color="color" />
    </Button>
  </div>
</template>
