<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";
import { faBowlFood, faUtensils } from "@fortawesome/free-solid-svg-icons";
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
  {
    title: "dish.label",
    icon: faBowlFood,
    to: "/dish",
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
          <router-link
            :to="item.to"
            active-class="!bg-blue-300 "
            class="flex items-center p-2 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            <font-awesome-icon
              v-if="typeof item.icon === 'object'"
              :icon="item.icon"
              class="w-6 h-6"
            />
            <component :is="item.icon" v-else class="w-6 h-6" />
            <span class="ml-3">{{ $t(item.title) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped></style>
