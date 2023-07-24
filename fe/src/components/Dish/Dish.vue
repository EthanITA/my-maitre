<template>
  <Container v-if="Object.values(categories).length" title="dish.label">
    <template #action>
      <Button @click="$router.push('/dish/category/create')"
        >{{ $t("category.add") }}
      </Button>
    </template>
    <div
      v-for="category in sortBy(Object.values(categories), 'name')"
      class="flex flex-col gap-2 ml-2"
    >
      <div class="flex justify-between mx-1">
        <h2 class="font-semibold text-gray-500">
          {{ category.name }}
        </h2>
        <div class="flex gap-1">
          <Button
            outline
            pill
            color="dark"
            size="xs"
            @click="$router.push(`/dish/create?categoryId=${category.id}`)"
          >
            <PlusIcon class="h-4 w-4" />
          </Button>
          <Button
            outline
            pill
            size="xs"
            :disabled="category.loading"
            @click="$router.push(`/dish/category/edit/${category.id}`)"
          >
            <PencilIcon class="h-4 w-4" />
          </Button>
          <Button
            outline
            pill
            color="red"
            :disabled="!!(category.loading || dishes[category.id]?.length)"
            :loading="category.loading"
            size="xs"
            @click="deleteCategory(category)"
          >
            <TrashIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table
        :data="sortBy(dishes[category.id], 'name')"
        :headers="['image', 'name', 'price', 'allergens', 'characteristics']"
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
        <template #image="{ value }">
          <img
            :alt="value.image"
            v-if="value.image"
            :src="getUrlImg(value)"
            class="mx-auto h-12 w-12"
          />
          <div v-else class="mx-auto h-12 w-12 bg-gray-200 flex">
            <CameraIcon class="h-6 w-6 text-gray-400 m-auto" />
          </div>
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
  <Sheet class="h-full text-center flex flex-col gap-2 p-4 pb-2" v-else>
    <ExclamationTriangleIcon class="text-amber-500 mx-auto h-12 w-12" />
    <h1 class="text-2xl font-bold">{{ $t("category.missing.title") }}</h1>
    <p class="text-gray-500">
      {{ $t("category.missing.description") }}
    </p>
    <Button class="mx-auto mt-4" @click="$router.push('/dish/category/create')">
      {{ $t("category.add") }}
    </Button>
  </Sheet>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import { Button } from "flowbite-vue";
import Table from "../Table.vue";
import {
  CameraIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";

import { sortBy } from "lodash";
import Dish, { DishItem } from "../../models/Dish.ts";
import Category, { CategoryItem } from "../../models/Category.ts";
import UnitOfMeasure, { UnitOfMeasureItem } from "../../models/UnitOfMeasure";
import Sheet from "../Sheet.vue";

const unitOfMeasures = ref<
  Record<NonNullable<UnitOfMeasureItem["id"]>, UnitOfMeasureItem>
>([]);

const dishes = ref<Record<DishItem["category_id"], DishItem[]>>({});
const categories = ref<
  Record<
    DishItem["category_id"],
    CategoryItem & {
      id: NonNullable<CategoryItem["id"]>;
      loading?: boolean;
    }
  >
>({});

const getUrlImg = (dish: DishItem) => {
  return new Dish(dish).imgUrl.href;
};

const deleteDish = (
  dish: DishItem & {
    loading?: boolean;
  }
) => {
  dish.loading = true;
  new Dish(dish).delete().then(() => {
    dishes.value[dish.category_id] = dishes.value[dish.category_id].filter(
      (dishItem) => dishItem.id !== dish.id
    );
  });
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
const deleteCategory = ({ id }) => {
  categories.value[id].loading = true;
  new Category(categories.value[id])
    .delete()
    .then(() => {
      delete categories.value[id];
    })
    .finally(() => (categories.value[id].loading = false));
};
</script>

<style scoped></style>
