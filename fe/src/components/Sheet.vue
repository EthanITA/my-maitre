<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm w-full"
    :class="{
      relative: disabled,
    }"
  >
    <div class="m-4 overflow-x-auto" v-bind="$attrs">
      <div class="my-2" v-if="$slots.header">
        <slot name="header" />
      </div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 bg-white/30 border-t-[1px] flex">
      <slot name="footer" />
    </div>

    <div
      v-if="disabled"
      class="absolute inset-0 rounded-lg bg-white/60 cursor-not-allowed"
    />
  </div>
</template>

<style scoped></style>
