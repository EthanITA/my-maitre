<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { HomeIcon } from "@heroicons/vue/24/solid";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const items: {
  title: string;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps> | IconDefinition;
  to: string;
}[] = [
  {
    title: "home",
    icon: HomeIcon,
    to: "/",
  },
  {
    title: "menu.label",
    icon: faUtensils,
    to: "/menu",
  },
];
</script>

<template>
  <aside
    id="default-sidebar"
    aria-label="Sidebar"
    class="h-screen transition-transform -translate-x-full sm:translate-x-0"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <ul class="space-y-2 font-medium">
        <li v-for="item in items" :key="item.to">
          <a
            :href="item.to"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <font-awesome-icon
              v-if="typeof item.icon === 'object'"
              :icon="item.icon"
              class="w-6 h-6"
            />
            <component :is="item.icon" v-else class="w-6 h-6" />
            <span class="ml-3">{{ $t(item.title) }}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped></style>
