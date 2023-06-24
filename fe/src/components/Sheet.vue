<script setup lang="ts"></script>

<template>
  <div class="bg-white rounded-lg shadow-sm w-full">
    <div class="m-4 overflow-x-auto" v-bind="$attrs">
      <slot />
    </div>
    <div class="p-4 bg-white/30 border-t-[1px] flex">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped></style>
