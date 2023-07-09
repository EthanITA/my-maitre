<template>
  <DishCreation
    v-if="dish?.id"
    :errorText="errorText"
    :form="dish"
    is-updating
  />
</template>
<script lang="ts" setup>
import DishCreation from "../../components/Dish/DishCreation.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import Dish from "../../models/Dish.ts";

const route = useRoute();
const router = useRouter();
const dishId = route.params.id as string;
const dish = ref<Dish>();
const errorText = ref<string>("");
Dish.get(Number(dishId))
  .then((d) => {
    dish.value = new Dish(d);
  })
  .catch(() => router.push("/menu"));
</script>

<style scoped></style>
