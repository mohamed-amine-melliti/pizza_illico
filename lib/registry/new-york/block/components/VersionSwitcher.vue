<script setup lang="ts">


import DropdownMenu from '~/components/Ui/DropdownMenu/DropdownMenu.vue'
import DropdownMenuContent from '~/components/Ui/DropdownMenu/Content.vue'
import DropdownMenuItem from '~/components/Ui/DropdownMenu/Item.vue'
import DropdownMenuTrigger from '~/components/Ui/DropdownMenu/Trigger.vue'
import { SidebarMenu } from '~/components/Ui/Sidebar';
import { SidebarMenuButton } from '~/components/Ui/Sidebar';
import { SidebarMenuItem } from '~/components/Ui/Sidebar';
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  versions: string[]
  defaultVersion: string
}>()

const selectedVersion = ref(props.defaultVersion)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-semibold">Documentation</span>
              <span class="">v{{ selectedVersion }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width]"
          align="start"
        >
          <DropdownMenuItem
            v-for="version in versions"
            :key="version"
            @select="selectedVersion = version"
          >
            v{{ version }}
            <Check v-if="version === selectedVersion" class="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
