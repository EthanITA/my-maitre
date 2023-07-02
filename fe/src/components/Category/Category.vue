<template>
  <Container title="category.label" description="category.description">
    <template #action>
      <Button @click="$router.push('/category/create')">{{
        $t("category.add")
      }}</Button>
    </template>

    <Table
      :headers="['name', 'plates', 'avgPrice', 'minPrice', 'maxPrice']"
      :data="categories"
      prefix="category.fields"
    >
      <template #actions="{ value }">
        <Button
          outline
          pill
          square
          @click="$router.push(`/category/edit/${value.id}`)"
        >
          <PencilIcon class="h-4 w-4" />
        </Button>
      </template>
    </Table>
  </Container>
</template>
<script setup lang="ts">
import Container from "../Container.vue";
import { Button } from "flowbite-vue";
import Table from "../Table.vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import Category, { CategoryItem } from "../../models/Category.ts";
import { sortBy } from "lodash";

const categories = ref<CategoryItem[]>([]);

onMounted(async () => {
  categories.value = sortBy(await Category.getAll(), "name");
});
</script>

<style scoped></style>
