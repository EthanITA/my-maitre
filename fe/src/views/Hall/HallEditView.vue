<template>
  <HallCreation
    v-if="hall?.name"
    :errorText="errorText"
    :form="hall"
    is-updating
  />
</template>
<script lang="ts" setup>
import HallCreation from "../../components/Hall/HallCreation.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import Hall from "../../models/Hall.ts";

const route = useRoute();
const router = useRouter();
const hallId = route.params.name as string;
console.log(route.params);
const hall = ref<Hall>();
const errorText = ref<string>("");
Hall.get(hallId)
  .then((d) => {
    hall.value = new Hall(d);
  })
  .catch(() => router.push("/hall"));
</script>

<style scoped></style>
