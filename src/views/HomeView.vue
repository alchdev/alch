<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  PhGameController,
  PhPencil,
  PhFileText,
  PhUsers,
} from '@phosphor-icons/vue'

const cards = [
  {
    title: 'Mods',
    description: 'Open the list of all mods you have ever played or edited.',
    icon: PhGameController,
  },
  {
    title: 'Editor',
    description: 'Create a new blank file and start developing a new game.',
    icon: PhPencil,
  },
  {
    title: 'Docs',
    description: 'All information about how to play or create a game.',
    icon: PhFileText,
  },
  {
    title: 'Community',
    description: 'Join our social media and meet other players.',
    icon: PhUsers,
  },
]
</script>

<template>
  <main class="font-roboto container pt-24">
    <h1
      class="flex justify-center font-quicksand font-bold text-5xl select-none"
    >
      Alchemy
    </h1>
    <p
      class="flex justify-center pt-4 text-base text-center text-slate-900 dark:text-slate-200 select-none"
    >
      Welcome back! What would you like to do today?
    </p>
    <nav
      class="grid min-[990px]:grid-cols-[repeat(4,_240px)] min-[500px]:grid-cols-[repeat(2,_240px)] grid-cols-[repeat(1,_240px)] justify-center py-8 gap-2 select-none"
    >
      <Card
        v-for="card in cards"
        :key="card.title"
        class="cursor-pointer hover:bg-neutral-900"
      >
        <CardHeader>
          <CardTitle>
            <span class="flex gap-x-2"
              ><component :is="card.icon" weight="bold" />{{ card.title }}</span
            >
          </CardTitle>
          <CardDescription>{{ card.description }}</CardDescription>
        </CardHeader>
      </Card>
    </nav>
  </main>
</template>
