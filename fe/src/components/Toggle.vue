<script lang="ts" setup>
defineProps<{
  label?: string;
  rightLabel?: boolean;
  modelValue?: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="cursor-pointer flex items-center">
    <span
      v-if="!rightLabel && label"
      class="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }} {{ rightLabel }}
    </span>
    <span class="relative w-fit inline-flex items-center">
      <input
        class="sr-only peer"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as any).checked)"
      />
      <span
        class="bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6"
      />
    </span>
    <span
      v-if="rightLabel && label"
      class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </span>
  </label>
</template>

<style scoped></style>
