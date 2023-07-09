<template>
  <DishCreation :category-id="categoryId" />
</template>
<script setup lang="ts">
import DishCreation from "../../components/Dish/DishCreation.vue";
import { useRoute } from "vue-router";
import { toNumber } from "lodash";

const categoryId: number = toNumber(useRoute().query?.categoryId);
</script>

<style scoped></style>
