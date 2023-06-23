<script setup lang="ts"></script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm w-full">
    <div class="overflow-x-auto" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
