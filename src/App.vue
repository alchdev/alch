<script setup lang="ts">
import TitleBar from './components/TitleBar.vue'
</script>

<template>
  <TitleBar />
  <main class="font-roboto container pt-24">
    <h1
      class="flex justify-center font-quicksand font-bold text-5xl select-none">
      Alchemy
    </h1>
    <p
      class="flex justify-center pt-4 text-base text-center text-slate-900 dark:text-slate-200 select-none">
      Welcome back! What would you like to do today?
    </p>
  </main>
</template>
