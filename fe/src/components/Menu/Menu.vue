<script setup lang="ts">
import { Button } from "flowbite-vue";
import { ref } from "vue";
import Table from "../Table.vue";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import Container from "../Container.vue";
import { MenuItem } from "../../models/Menu.ts";
// @ts-ignore
const menus = ref<MenuItem[]>([
  {
    id: 1,
    name: "Menu 1",
    description: "Menu 1 description",
    icon: "https://picsum.photos/200",
    hide_price: false,
    location_id: 1,
    order_type: "",
  },
]);
</script>

<template>
  <Container title="menu.label" description="menu.description">
    <template #action>
      <Button @click="$router.push('/menu/create')">{{
        $t("menu.add")
      }}</Button>
    </template>
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
  </Container>
</template>
<style scoped></style>
