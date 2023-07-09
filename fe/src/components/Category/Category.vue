<template>
  <Container description="category.description" title="category.label">
    <template #action>
      <Button @click="$router.push('/category/create')"
        >{{ $t("category.add") }}
      </Button>
    </template>

    <Table
      :data="categories"
      :headers="['name', 'numberOfDishes', 'avgPrice', 'minPrice', 'maxPrice']"
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
      <template #avgPrice="{ value }">
        {{ value.avgPrice.toFixed(2) }}
      </template>
      <template #minPrice="{ value }">
        {{ value.minPrice.toFixed(2) }}
      </template>
      <template #maxPrice="{ value }">
        {{ value.maxPrice.toFixed(2) }}
      </template>
    </Table>
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import { Button } from "flowbite-vue";
import Table from "../Table.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref } from "vue";
import Category, {
  CategoryItem,
  CategoryStats,
} from "../../models/Category.ts";
import { sortBy } from "lodash";
import Dish, { DishItem } from "../../models/Dish.ts";

const categories = ref<(CategoryItem & CategoryStats)[]>([]);
const dishes = ref<DishItem[]>([]);
const usedCategories = computed<Set<NonNullable<DishItem["category_id"]>>>(
  () => {
    const set = new Set<number>();
    dishes.value.forEach((dish) => {
      set.add(dish.category_id);
    });
    return set;
  }
);

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
  dishes.value = await Dish.getAll();
  categories.value = sortBy(
    (await Category.getAll()).map((category) => {
      return {
        ...category,
        ...new Category(category).getStats(dishes.value),
      };
    }),
    "name"
  );
});
</script>

<style scoped></style>
