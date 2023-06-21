<script setup lang="ts">
import { Button } from "flowbite-vue";
import { ref } from "vue";
import Table from "./Table.vue";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
// @ts-ignore
const menus = ref<Menu[]>([
  {
    id: 1,
    name: "Menu 1",
    available_dates: [],
    available_hours: [],
    description: "Menu 1 description",
    icon: "https://picsum.photos/200",
    hide_price: false,
    location_id: 1,
    order_type: 1,
    visibility: true,
  },
]);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      <div class="pr-16">
        <p class="font-semibold text-xl">{{ $t("menu.label") }}</p>
        <p>{{ $t("menu.description") }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Button color="green"> {{ $t("menu.customize") }}</Button>
        <Button>{{ $t("menu.add") }}</Button>
      </div>
    </div>
    <Table
      prefix="menu"
      :headers="['name', 'plates', 'visibility']"
      :data="menus"
    >
      <template #price="{ value }">
        {{ value.price }}
      </template>
      <template #plates> 1 </template>
      <template #actions>
        <Button pill square outline>
          <ArrowRightIcon class="h-4 w-4" />
        </Button>
      </template>
    </Table>
  </div>
</template>
<style scoped></style>
