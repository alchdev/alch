<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar'

import { PhList } from '@phosphor-icons/vue'
import { useColorMode } from '@vueuse/core'
import { ref } from 'vue'
import WindowControls from './WindowControls.vue'

const mode = useColorMode({ emitAuto: true })
const color = ref(mode.valueOf() === 'light' ? 'black' : 'white')
const changeTheme = (theme: Theme) => {
  mode.value = theme
  color.value = theme === 'light' ? 'black' : 'white'
}

const isTauriApp = '__TAURI_INTERNALS__' in window

type Theme = 'light' | 'dark' | 'auto'

interface MenubarSubInterface {
  component: 'MenubarSub'
  name: string
  content: MenubarItemInterface[]
}

interface MenubarSeparatorInterface {
  component: 'MenubarSeparator'
}

interface MenubarItemInterface {
  component: 'MenubarItem'
  name: string
  shortcut?: string
  theme?: Theme
  props?: {
    onClick?: () => void
  }
}

interface MenuButton {
  name: string
  content: (
    | MenubarItemInterface
    | MenubarSeparatorInterface
    | MenubarSubInterface
  )[]
}

const menu: MenuButton[] = [
  {
    name: 'File',
    content: [
      {
        component: 'MenubarItem',
        name: 'Open File',
        shortcut: 'Ctrl+O',
      },
      {
        component: 'MenubarItem',
        name: 'Close File',
        shortcut: 'Ctrl+W',
      },
      {
        component: 'MenubarSeparator',
      },
      {
        component: 'MenubarItem',
        name: 'Save File',
        shortcut: 'Ctrl+S',
      },
      {
        component: 'MenubarItem',
        name: 'Save As...',
        shortcut: 'Ctrl+Shift+S',
      },
      {
        component: 'MenubarSeparator',
      },
      {
        component: 'MenubarItem',
        name: 'Import File',
      },
      {
        component: 'MenubarItem',
        name: 'Export File',
      },
    ],
  },
  {
    name: 'Settings',
    content: [
      {
        component: 'MenubarSub',
        name: 'Change Theme',
        content: [
          {
            component: 'MenubarItem',
            name: 'Light',
            theme: 'light',
            props: {
              onClick: () => changeTheme('light'),
            },
          },
          {
            component: 'MenubarItem',
            name: 'Dark',
            theme: 'dark',
            props: {
              onClick: () => changeTheme('dark'),
            },
          },
          {
            component: 'MenubarItem',
            name: 'System',
            theme: 'auto',
            props: {
              onClick: () => changeTheme('auto'),
            },
          },
        ],
      },
    ],
  },
]

const menubarComponents = {
  MenubarItem: MenubarItem,
  MenubarSeparator: MenubarSeparator,
  MenubarSub: MenubarSub,
}

const dropdownMenuComponents = {
  MenubarItem: DropdownMenuItem,
  MenubarSeparator: DropdownMenuSeparator,
  MenubarSub: DropdownMenuSub,
}
</script>

<template>
  <Menubar data-tauri-drag-region class="rounded-none border-x-0 border-t-0">
    <span
      data-tauri-drag-region
      class="font-quicksand font-bold pl-4 pr-2 select-none hidden min-[400px]:block"
      >Alchemy</span
    >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="min-[400px]:hidden" variant="ghost" size="icon">
          <PhList :color="mode.valueOf() === 'light' ? 'black' : 'white'" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-24">
        <DropdownMenuLabel
          ><span class="font-quicksand font-bold select-none"
            >Alchemy</span
          ></DropdownMenuLabel
        >
        <DropdownMenuSeparator />
        <DropdownMenuGroup v-for="menuButton in menu">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{{
              menuButton.name
            }}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <component
                  :is="dropdownMenuComponents[item.component]"
                  v-for="item in menuButton.content"
                >
                  <template v-if="item.component === 'MenubarItem'">
                    {{ item.name }}
                    <DropdownMenuShortcut>{{
                      item.shortcut
                    }}</DropdownMenuShortcut>
                  </template>
                  <template v-if="item.component === 'MenubarSub'">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>{{
                        item.name
                      }}</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            v-for="subItem in item.content"
                            v-bind="subItem.props"
                            :class="{
                              'font-bold':
                                subItem.theme &&
                                mode.valueOf() === subItem.theme,
                            }"
                          >
                            {{ subItem.name }}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </template>
                </component>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <MenubarMenu v-for="menuButton in menu">
      <MenubarTrigger class="hidden min-[400px]:block">{{
        menuButton.name
      }}</MenubarTrigger>
      <MenubarContent>
        <component
          :is="menubarComponents[item.component]"
          v-for="item in menuButton.content"
        >
          <template v-if="item.component === 'MenubarItem'">
            {{ item.name }}
            <MenubarShortcut>{{ item.shortcut }}</MenubarShortcut>
          </template>
          <template v-if="item.component === 'MenubarSub'">
            <MenubarSubTrigger>{{ item.name }}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                v-for="subItem in item.content"
                v-bind="subItem.props"
                :class="{
                  'font-bold':
                    subItem.theme && mode.valueOf() === subItem.theme,
                }"
              >
                {{ subItem.name }}
              </MenubarItem>
            </MenubarSubContent>
          </template>
        </component>
      </MenubarContent>
    </MenubarMenu>
    <WindowControls v-if="isTauriApp" />
  </Menubar>
</template>
