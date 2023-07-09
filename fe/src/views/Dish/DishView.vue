<script setup lang="ts">
import Dish from "../../components/Dish/Dish.vue";
import Category, { CategoryItem } from "../../models/Category";
import { onMounted, ref } from "vue";
import Sheet from "../../components/Sheet.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/solid";
import { Button } from "flowbite-vue";

const categories = ref<CategoryItem[]>([]);

onMounted(async () => {
  categories.value = await Category.getAll();
});
</script>

<template>
  <Dish v-if="categories.length" />
  <Sheet class="h-full text-center flex flex-col gap-2 p-4 pb-2" v-else>
    <ExclamationTriangleIcon class="text-amber-500 mx-auto h-12 w-12" />
    <h1 class="text-2xl font-bold">{{ $t("category.missing.title") }}</h1>
    <p class="text-gray-500">
      {{ $t("category.missing.description") }}
    </p>
    <Button class="mx-auto mt-4" @click="$router.push('/menu/create')">
      {{ $t("category.add") }}
    </Button>
  </Sheet>
</template>

<style scoped></style>
