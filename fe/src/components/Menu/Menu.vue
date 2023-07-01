<script setup lang="ts">
import { Button } from "flowbite-vue";
import { onMounted, ref } from "vue";
import Table from "../Table.vue";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import Container from "../Container.vue";
import Menu, { MenuItem } from "../../models/Menu.ts";
// @ts-ignore
const menus = ref<MenuItem[]>([]);

onMounted(async () => {
  menus.value = await Menu.getAll();
});
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
      <template #actions="{ value }">
        <Button
          pill
          square
          outline
          @click="$router.push(`/menu/edit/${value.id}`)"
        >
          <ArrowRightIcon class="h-4 w-4" />
        </Button>
      </template>
    </Table>
  </Container>
</template>
<style scoped></style>
