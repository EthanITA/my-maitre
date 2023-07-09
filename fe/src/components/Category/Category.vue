<template>
  <Container description="category.description" title="category.label">
    <template #action>
      <Button @click="$router.push('/category/create')"
        >{{ $t("category.add") }}
      </Button>
    </template>

    <Table
      :data="categories"
      :headers="['name', 'plates', 'avgPrice', 'minPrice', 'maxPrice']"
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
        <Button
          :disabled="value.loading || usedCategories.has(value.id)"
          :loading="value.loading"
          color="red"
          outline
          pill
          square
          @click="deleteCategory(value)"
        >
          <TrashIcon v-if="!value.loading" class="h-4 w-4" />
        </Button>
      </template>
    </Table>
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import { Button } from "flowbite-vue";
import Table from "../Table.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import Category, { CategoryItem } from "../../models/Category.ts";
import { sortBy } from "lodash";
import Dish from "../../models/Dish.ts";

const categories = ref<CategoryItem[]>([]);
const usedCategories = ref<Set<NonNullable<CategoryItem["id"]>>>(new Set());

const deleteCategory = (
  category: CategoryItem & {
    loading?: boolean;
  }
) => {
  category.loading = true;
  new Category(category)
    .delete()
    .then(() => {
      categories.value = categories.value.filter((c) => c.id !== category.id);
    })
    .finally(() => (category.loading = false));
};

onMounted(async () => {
  categories.value = sortBy(await Category.getAll(), "name");
  (await Dish.getAll()).forEach((dish) => {
    usedCategories.value.add(dish.category_id);
  });
});
</script>

<style scoped></style>
