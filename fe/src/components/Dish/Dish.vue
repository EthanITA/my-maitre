<template>
  <Container title="dish.label">
    <div
      v-for="category in sortBy(Object.values(categories), 'name')"
      class="flex flex-col gap-2 ml-2"
    >
      <div class="flex justify-between mx-1">
        <h2 class="font-semibold text-gray-500">
          {{ category.name }}
        </h2>
        <Button
          outline
          pill
          size="xs"
          @click="
            $router.push({
              path: '/dish/create',
              query: { categoryId: category.id },
            })
          "
        >
          {{ $t("dish.addToCategory") }}
        </Button>
      </div>
      <Table
        :data="sortBy(dishes[category.id], 'name')"
        :headers="['name', 'price', 'allergens', 'characteristics']"
        prefix="dish.fields"
      >
        <template #actions="{ value }">
          <Button
            :disabled="value.loading"
            outline
            pill
            square
            @click="$router.push(`/dish/edit/${value.id}`)"
          >
            <PencilIcon class="h-4 w-4" />
          </Button>

          <Button
            :disabled="value.loading"
            :loading="value.loading"
            color="red"
            outline
            pill
            square
            @click="deleteDish(value)"
          >
            <TrashIcon v-if="!value.loading" class="h-4 w-4" />
          </Button>
        </template>
        <template #price="{ value }">
          {{ value.price }}
          {{
            $t(
              `dish.unitOfMeasure.${
                unitOfMeasures[value.unit_of_measure_id]?.measure
              }`
            )
          }}
        </template>
      </Table>
    </div>
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import { Button } from "flowbite-vue";
import Table from "../Table.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";

import { sortBy } from "lodash";
import Dish, { DishItem } from "../../models/Dish.ts";
import Category, { CategoryItem } from "../../models/Category.ts";
import UnitOfMeasure, { UnitOfMeasureItem } from "../../models/UnitOfMeasure";

const unitOfMeasures = ref<
  Record<NonNullable<UnitOfMeasureItem["id"]>, UnitOfMeasureItem>
>([]);

const dishes = ref<Record<DishItem["category_id"], DishItem[]>>({});
const categories = ref<
  Record<
    DishItem["category_id"],
    CategoryItem & {
      id: NonNullable<CategoryItem["id"]>;
    }
  >
>({});

const deleteDish = (
  dish: DishItem & {
    loading?: boolean;
  }
) => {
  dish.loading = true;
  new Dish(dish)
    .delete()
    .then(() => {
      dishes.value[dish.category_id] = dishes.value[dish.category_id].filter(
        (dishItem) => dishItem.id !== dish.id
      );
    })
    .finally(() => (dish.loading = false));
};

onMounted(async () => {
  categories.value = (await Category.getAll()).reduce((acc, categoryItem) => {
    acc[categoryItem.id as number] = categoryItem;
    return acc;
  }, {});

  dishes.value = (await Dish.getAll()).reduce((acc, dishItem) => {
    if (!acc[dishItem.category_id]) {
      acc[dishItem.category_id] = [];
    }
    acc[dishItem.category_id].push(dishItem);
    return acc;
  }, {});

  unitOfMeasures.value = (await UnitOfMeasure.getAll()).reduce(
    (acc, unitOfMeasureItem) => {
      acc[unitOfMeasureItem.id as number] = unitOfMeasureItem;
      return acc;
    },
    {}
  );
});
</script>

<style scoped></style>
