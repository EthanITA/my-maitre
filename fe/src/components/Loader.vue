<script setup lang="ts">
import loader from "../store/loader";

const loaderStore = loader();
</script>

<template>
  <Teleport v-if="loaderStore.loading" to="body">
    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-300/70 z-50 flex justify-center items-center"
    >
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-700"
      />
    </div>
  </Teleport>
</template>

<style scoped></style>
