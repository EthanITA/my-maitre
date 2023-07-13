<script setup lang="ts">
import Category, { CategoryItem } from "../../models/Category";
import { onMounted, ref } from "vue";
import Dish from "../../components/Dish/Dish.vue";

const categories = ref<CategoryItem[]>([]);

onMounted(async () => {
  categories.value = await Category.getAll();
});
</script>

<template>
  <Dish />
</template>

<style scoped></style>
