<template>
  <CategoryCreation v-if="category?.id" :form="category" is-updating />
</template>
<script lang="ts" setup>
import CategoryCreation from "../../components/Category/CategoryCreation.vue";
import { useRoute, useRouter } from "vue-router";
import Category from "../../models/Category";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id as string;
const category = ref<Category>();

Category.get(Number(categoryId))
  .then((m) => {
    category.value = new Category(m);
  })
  .catch(() => router.push("/category"));
</script>

<style scoped></style>
